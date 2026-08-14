#!/usr/bin/env python3
import asyncio
import base64
import logging
import re
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel, Field
import httpx
from helper import handle_error

file_name = "log.txt"

def overwrite_log_file():
    """Overwrite the log file with a header indicating a new session."""
    with open(file_name, "w") as f:
        f.write("=== New Session Started ===\n")

def append_to_log_file(message: str):
    """Append a message to the log file."""
    with open(file_name, "a") as f:
        f.write(f"{message}\n")

# Set up clean logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="TRACES 26AS Retriever Backend", version="2.0.0")

# CORS — restrict to the origins that will actually serve the frontend.
# In production replace the list with your exact domain(s).
# "*" is intentionally kept here only while running localhost for development;
# swap it for your deployed URL before going public.
CORS_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    # Add your production domain here, e.g.:
    # "https://yourdomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "sn"],
)

# Endpoints
FOSERVICES_URL = "https://eportal.incometax.gov.in/iec/foservices/"
LOGIN_API_URL = "https://eportal.incometax.gov.in/iec/loginapi/login"
EPORTAL_BASE = "https://eportal.incometax.gov.in/iec"

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive"
}

# --- Request Schemas via Pydantic ---
class RetrieveRequest(BaseModel):
    pan: str = Field(..., min_length=10, max_length=10, description="10-character PAN")
    password: str = Field(..., description="e-Filing password")
    ay: str = Field(..., description="Assessment Year")

class BulkRequest(BaseModel):
    records: list[RetrieveRequest] = Field(..., min_length=1, description="List of PAN credentials to check")

class ConnectRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")

class VerifyUserRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")

class LoginRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")
    password: str = Field(..., description="e-Filing password")
    reqId: str = Field(..., description="reqId token")
    secAccssMsg: str = Field(..., description="secAccssMsg token")
    entityType: Optional[str] = Field(None, description="entityType from Phase 2 response")

class DualLoginRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")
    originalResponse: dict = Field(..., description="The original JSON response dict from Phase 3")

class RedirectRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")
    ay: str = Field(..., description="Assessment Year")

class DownloadRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")
    ay: str = Field(..., description="Assessment Year")
    tracesBase: str = Field(..., description="Traces Base URL")

class LogoutRequest(BaseModel):
    pan: str = Field(..., min_length=1, max_length=16, description="PAN (up to 16 characters)")


def validate_pan(pan: str) -> bool:
    """PAN format validator: 5 letters, 4 digits, 1 letter."""
    if len(pan) > 16:
        return False
    return True


# --- Session Client Registry ---
active_sessions = {}
active_profiles = {}
# Tracks PANs that are currently mid-flow (connect → logout).
# Prevents the same PAN from being processed by two concurrent flows
# simultaneously (which would share and corrupt the same cookie jar).
processing_pans: set = set()

def get_pan_lock_info(pan: str) -> bool:
    """Returns True if PAN is already being processed."""
    return pan.upper() in processing_pans

def get_session_client(pan: str) -> httpx.AsyncClient:
    pan = pan.upper()
    if pan not in active_sessions:
        active_sessions[pan] = httpx.AsyncClient(headers=DEFAULT_HEADERS, trust_env=False)
    return active_sessions[pan]

async def close_session(pan: str):
    pan = pan.upper()
    processing_pans.discard(pan)
    if pan in active_sessions:
        client = active_sessions.pop(pan)
        await client.aclose()
    if pan in active_profiles:
        active_profiles.pop(pan)


# --- Async Phase Executors ---
async def execute_phase1_connect(client: httpx.AsyncClient, pan: str) -> dict:
    pan = pan.upper()
    if not validate_pan(pan):
        return {
            "pan": pan,
            "status": "failed",
            "error": "Invalid UserID. Must be 1-16 characters."
        }
        
    logger.info(f"[{pan}] Starting Phase 1: Establishing connection...")
    try:
        response = await client.get(FOSERVICES_URL, timeout=15.0)
        response.raise_for_status()
        overwrite_log_file()
        append_to_log_file(f"[{pan}] Phase 1 success.")
        append_to_log_file(f"Status Code: {response.status_code}")
        
        # Mandatory 2.0s cooldown delay
        logger.info(f"[{pan}] Phase 1 success. Cooldown delay (2.0s)...")
        await asyncio.sleep(2.0)
        return {
            "pan": pan,
            "status": "success"
        }
    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 1 failed with status code {e.response.status_code}")
        logger.error(f"[{pan}] Phase 1 HTTP failed: {e}")
        return handle_error(pan, "Establishing Connection Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 1 failed: {e}")
        logger.error(f"[{pan}] Phase 1 failed: {e}")
        return handle_error(pan, "Establishing Connection Phase", exception=e)


async def execute_phase2_verify(client: httpx.AsyncClient, pan: str) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 2: User ID verification...")
    headers = {
        "sn": "wLoginService",
        "Referer": FOSERVICES_URL,
        "Content-Type": "application/json"
    }
    payload = {
        "entity": pan,
        "serviceName": "wLoginService"
    }

    try:
        response = await client.post(
            LOGIN_API_URL,
            headers=headers,
            json=payload,
            timeout=15.0
        )
        response.raise_for_status()
        res_json = response.json()
        append_to_log_file(f"[{pan}] Phase 2 response: {res_json}")

        req_id = res_json.get("reqId")
        sec_msg = res_json.get("secAccssMsg")
        entity_type = res_json.get("entityType")

        if not req_id:
            logger.warning(f"[{pan}] Phase 2 user check failed: no reqId returned")
            return handle_error(pan, "User ID Verification Phase", response=response)

        logger.info(f"[{pan}] Phase 2 success. Keystroke delay (5.0s)...")
        await asyncio.sleep(5.0)
        return {
            "pan": pan,
            "status": "success",
            "reqId": req_id,
            "secAccssMsg": sec_msg,
            "entityType": entity_type
        }

    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 2 failed with HTTP status error: {e}")
        logger.error(f"[{pan}] Phase 2 HTTP failed: {e}")
        return handle_error(pan, "User ID Verification Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 2 failed: {e}")
        logger.error(f"[{pan}] Phase 2 failed: {e}")
        return handle_error(pan, "User ID Verification Phase", exception=e)


async def execute_phase3_login(client: httpx.AsyncClient, pan: str, password: str, req_id: str, sec_msg: str, entity_type: str = None) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 3: Logging in...")
    encoded_password = base64.b64encode(password.encode("utf-8")).decode("utf-8")
    
    headers = {
        "sn": "loginService",
        "Referer": FOSERVICES_URL,
        "Content-Type": "application/json"
    }
    payload = {
        "aadhaarMobileValidated": "false",
        "dtoService": "LOGIN",
        "entity": pan,
        "entityType": entity_type or "PAN",
        "errors": [],
        "exemptedPan": "false",
        "imagePath": None,
        "imgByte": None,
        "pass": encoded_password,
        "passValdtnFlg": None,
        "reqId": req_id,
        "role": "IN",
        "secAccssMsg": sec_msg,
        "secLoginOptions": "",
        "serviceName": "loginService",
        "uidValdtnFlg": "true",
        "userConsent": ""
    }

    try:
        response = await client.post(
            LOGIN_API_URL,
            headers=headers,
            json=payload,
            timeout=15.0
        )
        response.raise_for_status()
        res_json = response.json()
        append_to_log_file(f"[{pan}] Phase 3 response: {res_json}")

        messages = res_json.get("messages", [])
        is_dual_login = False
        
        if isinstance(messages, list):
            for msg in messages:
                if isinstance(msg, dict):
                    code = msg.get("code")
                    if code == "EF00177":
                        is_dual_login = True
                        break
                    elif code and code.startswith("EF") and code != "EF00000":
                        return handle_error(pan, "Logging In Phase", response=response)

        if is_dual_login:
            logger.info(f"[{pan}] Phase 3 returned dual login conflict warning (EF00177).")
            return {
                "pan": pan,
                "status": "dual_login",
                "reqId": req_id,
                "secAccssMsg": sec_msg,
                "originalResponse": res_json
            }

        logger.info(f"[{pan}] Phase 3 login success.")
        return {
            "pan": pan,
            "status": "success",
            "reqId": req_id,
            "secAccssMsg": sec_msg
        }

    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 3 failed with HTTP status error: {e}")
        logger.error(f"[{pan}] Phase 3 HTTP failed: {e}")
        return handle_error(pan, "Logging In Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 3 failed: {e}")
        logger.error(f"[{pan}] Phase 3 failed: {e}")
        return handle_error(pan, "Logging In Phase", exception=e)


async def execute_phase4_dual_login(client: httpx.AsyncClient, pan: str, original_response: dict) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 4: Handling dual login...")
    
    # 1. Wait exactly 3.0 seconds (simulates reading modal and clicking continue)
    logger.info(f"[{pan}] Phase 4: Simulating 3.0s delay...")
    await asyncio.sleep(3.0)
    
    # 2. Clone the original response payload and overwrite fields
    payload = original_response.copy()
    payload.update({
        "pass": None,
        "otpGenerationFlag": "true",
        "otpValdtnFlg": "true",
        "remark": "Continue",
        "serviceName": "loginService"
    })
    
    headers = {
        "sn": "loginService",
        "Referer": FOSERVICES_URL,
        "Content-Type": "application/json"
    }
    
    try:
        response = await client.post(
            LOGIN_API_URL,
            headers=headers,
            json=payload,
            timeout=15.0
        )
        response.raise_for_status()
        res_json = response.json()
        append_to_log_file(f"[{pan}] Phase 4 response: {res_json}")
        
        # Check for error codes
        messages = res_json.get("messages", [])
        if isinstance(messages, list):
            for msg in messages:
                if isinstance(msg, dict):
                    code = msg.get("code")
                    if code and code.startswith("EF") and code not in ["EF00000", "EF00177"]:
                        return handle_error(pan, "Handling Dual Login Phase", response=response)
                        
        logger.info(f"[{pan}] Phase 4 dual login override success.")
        return {
            "pan": pan,
            "status": "success"
        }
        
    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 4 failed with HTTP status error: {e}")
        logger.error(f"[{pan}] Phase 4 HTTP failed: {e}")
        return handle_error(pan, "Handling Dual Login Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 4 failed: {e}")
        logger.error(f"[{pan}] Phase 4 failed: {e}")
        return handle_error(pan, "Handling Dual Login Phase", exception=e)

async def execute_phase5_redirect(client: httpx.AsyncClient, pan: str, ay: str) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 5: Redirecting to Traces Portal...")
    
    # 1.0s cooldown delay
    await asyncio.sleep(1.0)
    
    # POST to redirectionView26AS
    redirect_api_url = f"{EPORTAL_BASE}/utilityservicesapi/auth/v0.1/redirectionView26AS"
    payload_step3 = {
        "pan": pan,
        "ay": ay,
        "actType": "O"
    }
    
    try:
        response = await client.post(
            redirect_api_url,
            json=payload_step3,
            headers={
                "Referer": "https://eportal.incometax.gov.in/iec/foservices/",
                "Content-Type": "application/json",
                "sn": "NA"
            },
            timeout=15.0
        )
        response.raise_for_status()
        res_json = response.json()
        append_to_log_file(f"[{pan}] Phase 5 redirectionView26AS response: {res_json}")
        
        sig_data = res_json.get("data")
        signature = res_json.get("signature")
        
        if not sig_data or not signature:
            logger.warning(f"[{pan}] Phase 5 failed: no signature or data in response")
            return handle_error(pan, "Redirecting to Traces Portal Phase", response=response)
            
    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 5 redirection signature failed with HTTP status error: {e}")
        logger.error(f"[{pan}] Phase 5 signature HTTP failed: {e}")
        return handle_error(pan, "Redirecting to Traces Portal Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 5 signature failed: {e}")
        logger.error(f"[{pan}] Phase 5 signature failed: {e}")
        return handle_error(pan, "Redirecting to Traces Portal Phase", exception=e)

    # Submit signature to TRACES bridge (manual redirect follow)
    payload_step4 = {
        "data": sig_data,
        "signature": signature
    }
    
    headers1 = {
        "User-Agent": client.headers.get("User-Agent", "Mozilla/5.0"),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://eportal.incometax.gov.in",
        "Referer": "https://eportal.incometax.gov.in/"
    }
    
    try:
        # Request 4.1: POST to services.tdscpc.gov.in
        res_step4 = await client.post(
            "https://services.tdscpc.gov.in/serv/view26AS.xhtml",
            data=payload_step4,
            headers=headers1,
            timeout=15.0
        )
        append_to_log_file(f"[{pan}] Phase 5 POST 1 status: {res_step4.status_code}")
        
        # Request 4.2: POST to traces dynamic target (307 Redirect)
        if res_step4.status_code == 307:
            url2 = res_step4.headers.get("Location")
            headers2 = headers1.copy()
            headers2.update({
                "Origin": "null",
                "Referer": "https://eportal.incometax.gov.in/"
            })
            res_step4 = await client.post(
                url2,
                data=payload_step4,
                headers=headers2,
                timeout=15.0
            )
            append_to_log_file(f"[{pan}] Phase 5 POST 2 status: {res_step4.status_code}")
            
        # Request 4.3: GET to welcome landing (302 or 307 Redirect)
        if res_step4.status_code in [302, 307]:
            url3 = res_step4.headers.get("Location")
            headers3 = {
                "User-Agent": client.headers.get("User-Agent", "Mozilla/5.0"),
                "Origin": "https://eportal.incometax.gov.in",
                "Referer": "https://eportal.incometax.gov.in/"
            }
            res_step4 = await client.get(
                url3,
                headers=headers3,
                timeout=15.0
            )
            append_to_log_file(f"[{pan}] Phase 5 GET 1 status: {res_step4.status_code}")
            
        # Request 4.4: Final GET welcome landing (307 SSL Upgrade Redirect)
        if res_step4.status_code in [302, 307]:
            url4 = res_step4.headers.get("Location")
            headers4 = {
                "User-Agent": client.headers.get("User-Agent", "Mozilla/5.0"),
                "Referer": "https://eportal.incometax.gov.in/"
            }
            res_step4 = await client.get(
                url4,
                headers=headers4,
                follow_redirects=True,
                timeout=15.0
            )
            append_to_log_file(f"[{pan}] Phase 5 GET 2 final url: {res_step4.url}")

        final_url_str = str(res_step4.url)
        if "autherror" in final_url_str:
            logger.error(f"[{pan}] Phase 5 TRACES session authentication failed (autherror).")
            return handle_error(pan, "Redirecting to Traces Portal Phase", response=res_step4)
            
        # Extract traces base URL
        match = re.match(r"(https?://[^/]+/serv)", final_url_str)
        if match:
            traces_base = match.group(1)
        else:
            traces_base = "https://traces61services.tdscpc.gov.in/serv"

        # Step 5: Initialize TRACES page state (GET /view26AS.xhtml)
        logger.info(f"[{pan}] Phase 5: Initializing TRACES page state...")
        view_url = f"{traces_base}/tapn/view26AS.xhtml"
        res_step5 = await client.get(
            view_url,
            headers={
                "Referer": f"{traces_base}/tapn/welcome26AS.xhtml",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            },
            timeout=15.0
        )
        append_to_log_file(f"[{pan}] Phase 5 final initialize status: {res_step5.status_code}")
        
        if res_step5.status_code != 200:
            logger.error(f"[{pan}] Phase 5 page initialize failed: status {res_step5.status_code}")
            return handle_error(pan, "Redirecting to Traces Portal Phase", response=res_step5)

        # Extract basic taxpayer details from Step 5 response text
        html_content = res_step5.text
        def extract_span(span_id):
            pat = rf'<span[^>]*id="{span_id}"[^>]*>(.*?)</span>'
            m = re.search(pat, html_content, re.DOTALL | re.IGNORECASE)
            if m:
                val = m.group(1).strip()
                val = re.sub(r'<[^>]*>', '', val)
                return val.replace('&nbsp;', ' ').strip()
            return ""
        
        assessee_name = extract_span("dedPanName")
        pan_status = extract_span("panStatus")
        address1 = extract_span("add1")
        address2 = extract_span("add2")

        # Save to active profiles registry
        active_profiles[pan] = {
            "assesseeName": assessee_name,
            "panStatus": pan_status,
            "address1": address1,
            "address2": address2
        }

        logger.info(f"[{pan}] Phase 5 redirect and initialization success. Extracted taxpayer: {assessee_name}")
        return {
            "pan": pan,
            "status": "success",
            "tracesBase": traces_base,
            "assesseeName": assessee_name,
            "panStatus": pan_status,
            "address1": address1,
            "address2": address2
        }

    except httpx.HTTPStatusError as e:
        append_to_log_file(f"[{pan}] Phase 5 manual redirect failed with HTTP status error: {e}")
        logger.error(f"[{pan}] Phase 5 redirect HTTP failed: {e}")
        return handle_error(pan, "Redirecting to Traces Portal Phase", response=e.response)
    except Exception as e:
        append_to_log_file(f"[{pan}] Phase 5 manual redirect failed: {e}")
        logger.error(f"[{pan}] Phase 5 redirect failed: {e}")
        return handle_error(pan, "Redirecting to Traces Portal Phase", exception=e)

async def execute_phase6_download(client: httpx.AsyncClient, pan: str, ay: str, traces_base: str) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 6: Downloading 26AS data...")
    
    ts_url = f"{traces_base}/tapn/srv/TDS26ASServlet"
    view_url = f"{traces_base}/tapn/view26AS.xhtml"
    
    # Step 6: Fetch Time Stamp Token
    logger.info(f"[{pan}] Phase 6 Step 6: Fetching timestamp token...")
    timestamp_ms = int(time.time() * 1000)
    try:
        response_ts = await client.get(
            ts_url,
            params={
                "reqtype": "getTimeStamp",
                "_": timestamp_ms
            },
            headers={
                "Referer": view_url,
                "X-Requested-With": "XMLHttpRequest"
            },
            timeout=15.0
        )
        response_ts.raise_for_status()
        append_to_log_file(f"[{pan}] Phase 6 Step 6 timestamp response: {response_ts.text}")
    except Exception as e:
        logger.error(f"[{pan}] Phase 6 Step 6 failed: {e}")
        return handle_error(pan, "Downloading 26AS Data Phase", exception=e)

    # Step 7: Retrieve JSON Tax Credits Table
    logger.info(f"[{pan}] Phase 6 Step 7: Requesting 26AS JSON tax credit tables...")
    payload_step7 = {
        "reqtype": "GetTaxPayer",
        "assessYear": ay[:4],
        "viewType": "HTML"
    }
    
    tax_json = None
    try:
        response_data = await client.post(
            ts_url,
            data=payload_step7,
            headers={
                "Referer": view_url,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            },
            timeout=20.0
        )
        response_data.raise_for_status()
        tax_json = response_data.json()
        append_to_log_file(f"[{pan}] Phase 6 Step 7 JSON tables response: Received valid JSON data.")
    except Exception as e:
        logger.error(f"[{pan}] Phase 6 Step 7 failed: {e}")
        return handle_error(pan, "Downloading 26AS Data Phase", exception=e)

    # Step 8: Trigger Audit Log (no PDF statement binary expected in response)
    logger.info(f"[{pan}] Phase 6 Step 8: Sending PDF export audit confirmation...")
    try:
        audit_params = {
            "reqtype": "audit",
            "assessYear": ay[:4],
            "viewType": "CLPDF"
        }
        res_step8 = await client.post(
            ts_url,
            params=audit_params,
            headers={
                "Referer": view_url,
                "X-Requested-With": "XMLHttpRequest"
            },
            timeout=15.0
        )
        append_to_log_file(f"[{pan}] Phase 6 Step 8 Audit complete (Status: {res_step8.status_code})")
        logger.info(f"[{pan}] Phase 6 Step 8 Audit complete.")
    except Exception as e:
        logger.warning(f"[{pan}] Phase 6 Step 8 failed: {e}. Proceeding as it is non-blocking.")

    # Retrieve profile data from active profiles registry
    profile = active_profiles.get(pan, {})
    assessee_name = profile.get("assesseeName", "")
    pan_status = profile.get("panStatus", "")
    address1 = profile.get("address1", "")
    address2 = profile.get("address2", "")
    fy = profile.get("financialYear", "")
    ay = profile.get("assessYearSelectedVal", "")



    return {
        "pan": pan,
        "status": "success",
        "taxData": tax_json,
        "assesseeName": assessee_name,
        "panStatus": pan_status,
        "address1": address1,
        "address2": address2,
        "ay": ay,
        "fy": fy
    }

async def execute_phase7_logout(client: httpx.AsyncClient, pan: str) -> dict:
    pan = pan.upper()
    logger.info(f"[{pan}] Starting Phase 7: Logging out...")
    
    logout_url = f"{EPORTAL_BASE}/loginapi/login"
    payload = {
        "serviceName": "logoutService",
        "entity": pan,
        "userType": "IND"
    }
    
    try:
        response = await client.post(
            logout_url,
            json=payload,
            headers={
                "Referer": "https://eportal.incometax.gov.in/iec/foservices/",
                "Content-Type": "application/json",
                "sn": "logoutService"
            },
            timeout=15.0
        )
        response.raise_for_status()
        res_json = response.json()
        append_to_log_file(f"[{pan}] Phase 7 logout response: {res_json}")
        logger.info(f"[{pan}] Phase 7: Logout successful.")
    except Exception as e:
        logger.warning(f"[{pan}] Phase 7 logout request failed: {e}. Proceeding with session closure.")
        append_to_log_file(f"[{pan}] Phase 7 logout request failed: {e}")
        
    # Always clean up the session client
    await close_session(pan)
    return {
        "pan": pan,
        "status": "success"
    }


# --- Endpoint Routing ---
from fastapi import Response

@app.post("/api/connect")
async def connect_endpoint(req: ConnectRequest, response: Response):
    pan = req.pan.upper()
    # Reject if this PAN is already mid-flow in another request
    if pan in processing_pans:
        response.status_code = 409
        return {
            "pan": pan,
            "status": "failed",
            "error": f"PAN {pan} is already being processed. Wait for the current retrieval to finish before starting another."
        }
    processing_pans.add(pan)
    client = get_session_client(pan)
    result = await execute_phase1_connect(client, pan)
    if result.get("status") == "failed":
        await close_session(pan)
    return result


@app.post("/api/verify-user")
async def verify_user_endpoint(req: VerifyUserRequest):
    client = get_session_client(req.pan)
    result = await execute_phase2_verify(client, req.pan)
    if result.get("status") == "failed":
        await close_session(req.pan)
    return result


@app.post("/api/login")
async def login_endpoint(req: LoginRequest):
    client = get_session_client(req.pan)
    result = await execute_phase3_login(client, req.pan, req.password, req.reqId, req.secAccssMsg, req.entityType)
    if result.get("status") == "failed":
        await close_session(req.pan)
    return result


@app.post("/api/handle-dual-login")
async def handle_dual_login_endpoint(req: DualLoginRequest):
    client = get_session_client(req.pan)
    result = await execute_phase4_dual_login(client, req.pan, req.originalResponse)
    if result.get("status") == "failed":
        await close_session(req.pan)
    return result


@app.post("/api/redirect-to-traces")
async def redirect_to_traces_endpoint(req: RedirectRequest):
    client = get_session_client(req.pan)
    result = await execute_phase5_redirect(client, req.pan, req.ay)
    if result.get("status") == "failed":
        await close_session(req.pan)
    return result


@app.post("/api/download-26as")
async def download_26as_endpoint(req: DownloadRequest):
    client = get_session_client(req.pan)
    result = await execute_phase6_download(client, req.pan, req.ay, req.tracesBase)
    if result.get("status") == "failed":
        await close_session(req.pan)
    return result


@app.post("/api/logout")
async def logout_endpoint(req: LogoutRequest):
    client = get_session_client(req.pan)
    result = await execute_phase7_logout(client, req.pan)
    return result


# --- Backward Compatible Wrappers ---
@app.post("/api/retrieve-single")
async def retrieve_single(req: RetrieveRequest):
    """Endpoint for executing single retrieval requests asynchronously (backward compatible wrapper)."""
    client = get_session_client(req.pan)
    try:
        res1 = await execute_phase1_connect(client, req.pan)
        if res1.get("status") == "failed":
            return res1
        res2 = await execute_phase2_verify(client, req.pan)
        if res2.get("status") == "failed":
            return res2
        res3 = await execute_phase3_login(client, req.pan, req.password, res2.get("reqId"), res2.get("secAccssMsg"), res2.get("entityType"))
        if res3.get("status") == "failed":
            return res3
        if res3.get("status") == "dual_login":
            res4 = await execute_phase4_dual_login(client, req.pan, res3.get("originalResponse"))
            return res4
        return res3
    finally:
        await close_session(req.pan)


@app.post("/api/retrieve-bulk")
async def retrieve_bulk(req: BulkRequest):
    """
    Endpoint for bulk retrieval requests (backward compatible wrapper).
    Processes each PAN record sequentially (one by one) for this specific user.
    """
    logger.info(f"Received bulk request with {len(req.records)} records. Processing sequentially...")
    results = []

    for idx, record in enumerate(req.records):
        logger.info(f"Processing bulk item {idx + 1}/{len(req.records)}: {record.pan}")
        client = get_session_client(record.pan)
        try:
            res1 = await execute_phase1_connect(client, record.pan)
            if res1.get("status") == "failed":
                results.append(res1)
                continue
            res2 = await execute_phase2_verify(client, record.pan)
            if res2.get("status") == "failed":
                results.append(res2)
                continue
            res3 = await execute_phase3_login(client, record.pan, record.password, res2.get("reqId"), res2.get("secAccssMsg"), res2.get("entityType"))
            if res3.get("status") == "failed":
                results.append(res3)
                continue
            if res3.get("status") == "dual_login":
                res4 = await execute_phase4_dual_login(client, record.pan, res3.get("originalResponse"))
                results.append(res4)
                continue
            results.append(res3)
        finally:
            await close_session(record.pan)

    logger.info(f"Completed bulk request with {len(req.records)} records.")
    return {
        "status": "completed",
        "results": results
    }


# Mount static files after declaring all explicit API routes
from fastapi.staticfiles import StaticFiles
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "26as-retrieval-portal"

app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")


if __name__ == "__main__":
    import uvicorn

    # ---------------------------------------------------------------
    # PRODUCTION NOTES
    # ---------------------------------------------------------------
    # workers=1 is MANDATORY.
    #   active_sessions and active_profiles are plain Python dicts
    #   stored in process memory. If you run >1 worker, each process
    #   gets its own copy of these dicts. A user who hits worker-A
    #   on /api/connect will lose their session if /api/login is
    #   routed to worker-B. Always keep workers=1 for this server.
    #
    # To scale horizontally, replace active_sessions /
    # active_profiles with a Redis-backed store first.
    #
    # To run from CLI (recommended for production):
    #   uvicorn backend:app --host 0.0.0.0 --port 8000 --workers 1
    # ---------------------------------------------------------------
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        workers=1,           # must stay 1 — see note above
        reload=False,
        access_log=True,     # logs every request to stdout
        timeout_keep_alive=30,
        log_level="info",
    )
