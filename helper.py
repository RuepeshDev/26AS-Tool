import json

def handle_error(pan, phase, status_code=None, response=None, exception=None):
    """
    Handles errors by logging them and returning a structured error response.

    Args:
        pan (str): The PAN number being processed.
        phase (str): The phase during which the error occurred.
        status_code (int, optional): The HTTP status code, if available.
        response (httpx.Response, optional): The HTTP response object, if available.
        exception (Exception, optional): The exception that was raised, if any. 
    """
    
    if status_code is not None:
        error_msg = f"[{pan}] {phase} failed with status code {status_code}"
    elif response is not None:
        try:
            error_content = response.json()
            messages = error_content.get("messages", [])
            parsed_code = None
            parsed_desc = None
            
            # Safely traverse messages array
            if isinstance(messages, list):
                for msg in messages:
                    if isinstance(msg, dict):
                        parsed_code = msg.get("code")
                        parsed_desc = msg.get("desc")
                        if parsed_code and parsed_desc:
                            break
            
            # Check fallback 'errors' field
            if not parsed_desc:
                parsed_desc = error_content.get("errors")
                
            if parsed_desc:
                code_str = f" {parsed_code}" if parsed_code else ""
                error_msg = f"[{pan}] {phase} failed with{code_str}: {parsed_desc}"
            else:
                error_msg = f"[{pan}] {phase} failed with response: {json.dumps(error_content)}"
        except Exception:
            error_content = response.text or ""
            # Truncate long HTML content to prevent log bloat
            if len(error_content) > 300:
                error_content = error_content[:300] + "..."
            error_msg = f"[{pan}] {phase} failed with response: {error_content}"
    elif exception is not None:
        error_msg = f"[{pan}] {phase} failed: {str(exception)}"
    else:
        error_msg = "Something went wrong. Please try again later."

    return {
        "pan": pan,
        "status": "failed",
        "error": error_msg
    }