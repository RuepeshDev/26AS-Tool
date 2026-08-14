#!/usr/bin/env python3
"""
Local Form 26AS PDF exporter.

Purpose
-------
Use the supplied TRACES view26AS.xhtml as the rendering source, inject a
previously obtained pdfData JSON object, and invoke the page's existing
export26ASPdf() function. This preserves the original PDF layout logic rather
than attempting to reimplement the very large JavaScript PDF renderer in
Python.

This is a LOCAL RENDERER. It does not log in to TRACES, retrieve tax data, or
bypass server-side controls. Supply the JSON data yourself.

Dependencies:
    pip install playwright requests
    playwright install chromium

Example:
    python export_26as_pdf.py \
        --xhtml view26AS.xhtml \
        --json 26as.json \
        --assessment-year 2023-24 \
        --pan ABCDE1234F \
        --output 26AS-2023.pdf \
        --assets assets

The first run can use --download-assets to obtain the public JS/image assets
referenced by the XHTML. For offline/reproducible builds, download once and
then omit --download-assets.
"""

from __future__ import annotations

import argparse
import base64
import json
import re
import tempfile
from pathlib import Path

import requests
from playwright.sync_api import sync_playwright


# These are the essential resources required for PDF generation.
ASSET_URLS = {
    "pdfmake.min.js": "https://traces61downloads.tdscpc.gov.in/js/pdfmake.min.js",
    "vfs_fonts.js": "https://traces61downloads.tdscpc.gov.in/js/vfs_fonts.js",
    "tds-logo.png": "https://traces61downloads.tdscpc.gov.in/serv/pdfimages/tds-logo.png",
    "indianemblem.png": "https://traces61downloads.tdscpc.gov.in/serv/pdfimages/indianemblem.png",
    "watermark.png": "https://traces61downloads.tdscpc.gov.in/serv/pdfimages/watermark.png",
}


def download_assets(asset_dir: Path, timeout: int = 30) -> None:
    """Download public assets referenced by the XHTML into asset_dir."""
    asset_dir.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 local Form26AS renderer"})

    for name, url in ASSET_URLS.items():
        target = asset_dir / name
        if target.exists() and target.stat().st_size > 0:
            continue
        r = session.get(url, timeout=timeout)
        r.raise_for_status()
        target.write_bytes(r.content)
        print(f"Downloaded {name}")


def _data_uri(path: Path) -> str:
    mime = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }.get(path.suffix.lower(), "application/octet-stream")
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode('ascii')}"


def _load_json(json_path: Path) -> dict:
    with json_path.open("r", encoding="utf-8") as f:
        value = json.load(f)
    if not isinstance(value, dict):
        raise ValueError("The JSON root must be an object/dictionary.")
    return value


def _patch_xhtml(
    source: str,
    json_data: dict,
    pan: str,
    assessment_year: str,
    assets: Path,
) -> str:
    """Patch the original XHTML for local, JSON-driven PDF generation."""

    # Make image elements immediately usable by the canvas helper in the
    # original JS. The original PDF function looks them up by DOM id.
    image_map = {
        "logo": assets / "tds-logo.png",
        "emblem": assets / "indianemblem.png",
        "watermark": assets / "watermark.png",
    }
    for element_id, path in image_map.items():
        if path.exists():
            uri = _data_uri(path)
            pattern = rf'(<img[^>]*\bid=["\']{re.escape(element_id)}["\'][^>]*\bsrc=["\'])[^"\']*(["\'])'
            source, n = re.subn(pattern, rf'\g<1>{uri}\g<2>', source, count=1, flags=re.I)
            if n == 0:
                pattern2 = rf'(<img[^>]*\bsrc=["\'])[^"\']*(["\'][^>]*\bid=["\']{re.escape(element_id)}["\'])'
                source = re.sub(pattern2, rf'\g<1>{uri}\g<2>', source, count=1, flags=re.I)
        else:
            raise FileNotFoundError(f"Missing required PDF image: {path}")

    # Rewrite known external JavaScript resources to local files when they
    # have been downloaded. This makes the renderer reproducible/offline.
    for name in ASSET_URLS:
        if not name.endswith(".js"):
            continue
        path = assets / name
        if not path.exists():
            continue
        source = re.sub(
            rf'<script([^>]+)src=["\'][^"\']*{re.escape(name)}["\']([^>]*?)>(.*?)</script>',
            rf'<script\1src="file://{path.resolve()}"\2>\3</script>',
            source,
            flags=re.I | re.S,
        )

    # Prevent the page from trying to submit an audit request after PDF export.
    # This is deliberately local-only behavior.
    local_bootstrap = f"""
<script>
window.__LOCAL_26AS_JSON__ = {json.dumps(json_data, ensure_ascii=False)};
window.__LOCAL_26AS_PAN__ = {json.dumps(pan)};
window.__LOCAL_26AS_AY__ = {json.dumps(assessment_year)};
window.fnLoad26AS = function() {{}};
window.insertAudit = function() {{}};
</script>
"""

    # Inject before the first body script can execute.
    source = source.replace("<body", local_bootstrap + "\n<body", 1)

    # The inline page has a body onload that normally retrieves data. Replace
    # only the call to fnLoad26AS with a no-op; the function remains available.
    source = source.replace("fnLoad26AS();", "/* local JSON renderer: data load disabled */", 1)

    # Add a final script that runs after the page's own scripts and exports the
    # PDF from the supplied JSON. It is appended before </body>.
    runner = r"""
<script>
(function() {
    function setText(id, value) {
        var el = document.getElementById(id);
        if (el) { el.textContent = value; el.innerHTML = value; }
    }

    window.pdfData = window.__LOCAL_26AS_JSON__;
    setText('pan', window.__LOCAL_26AS_PAN__ || '');
    setText('assessYearSelectedVal', window.__LOCAL_26AS_AY__ || '');

    // The original exporter uses this selected-year value repeatedly.
    window.assYrSelVal = String(window.__LOCAL_26AS_AY__ || '').substring(0, 4);

    // The source exporter calls insertAudit() at the end. Keep this local.
    window.insertAudit = function() {};

    window.__EXPORT_READY__ = true;
})();
</script>
"""
    source = source.replace("</body>", runner + "</body>", 1)
    return source


def export_26as_pdf(
    xhtml_path: str | Path,
    json_path: str | Path,
    output_pdf: str | Path,
    assessment_year: str,
    pan: str = "",
    assets_dir: str | Path = "assets",
    download_missing_assets: bool = False,
    timeout_ms: int = 60_000,
) -> Path:
    """
    Generate a Form 26AS-style PDF using the original XHTML's export26ASPdf().

    Parameters
    ----------
    xhtml_path:
        The supplied `view26AS.xhtml` file.
    json_path:
        JSON containing the `pdfData` object.
    output_pdf:
        Destination PDF path.
    assessment_year:
        Assessment Year, e.g. `2023-24`. The original renderer uses the first
        four digits for its major version switch.
    pan:
        PAN to display in the PDF header. Optional.
    assets_dir:
        Directory containing the PDF JS/image assets.
    download_missing_assets:
        If True, download the public assets referenced by the XHTML that are
        not already present in assets_dir.
    timeout_ms:
        Browser/page timeout.
    """
    xhtml_path = Path(xhtml_path).resolve()
    json_path = Path(json_path).resolve()
    output_pdf = Path(output_pdf).resolve()
    assets = Path(assets_dir).resolve()

    if not xhtml_path.exists():
        raise FileNotFoundError(xhtml_path)
    if not json_path.exists():
        raise FileNotFoundError(json_path)

    if download_missing_assets:
        download_assets(assets)

    missing = [name for name in ASSET_URLS if not (assets / name).exists()]
    if missing:
        raise FileNotFoundError(
            "Missing required assets: " + ", ".join(sorted(missing)) +
            ". Put them in --assets or use --download-assets."
        )

    json_data = _load_json(json_path)
    source = xhtml_path.read_text(encoding="utf-8", errors="ignore")
    patched = _patch_xhtml(source, json_data, pan, assessment_year, assets)

    output_pdf.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="form26as_") as tmp:
        tmpdir = Path(tmp)

        html_path = tmpdir / "view26AS_local.html"
        html_path.write_text(patched, encoding="utf-8")

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(accept_downloads=True)
            page = context.new_page()
            page.set_default_timeout(timeout_ms)

            # Load the converted HTML, not the original XHTML.
            page.goto(html_path.as_uri(), wait_until="load")

            print("content type:", page.evaluate("document.contentType"))
            print("export26ASPdf:", page.evaluate("typeof export26ASPdf"))
            print("pdfMake:", page.evaluate("typeof pdfMake"))

            # Set the data after all page scripts have loaded. This is more
            # reliable than relying on the page's normal server data loader.
            page.evaluate(
                """
                ({jsonData, pan, ay}) => {
                    window.pdfData = jsonData;
                    window.assYrSelVal = String(ay || '').substring(0, 4);
                    const panEl = document.getElementById('pan');
                    if (panEl) panEl.textContent = pan || '';
                    const ayEl = document.getElementById('assessYearSelectedVal');
                    if (ayEl) ayEl.textContent = ay || '';
                    window.insertAudit = function() {};
                }
                """,
                {"jsonData": json_data, "pan": pan, "ay": assessment_year},
            )

            # Confirm the exact original exporter is available.
            if not page.evaluate("typeof export26ASPdf === 'function'"):
                raise RuntimeError(
                    "export26ASPdf() was not found. The supplied XHTML may have "
                    "changed or the JavaScript failed to load."
                )

            with page.expect_download(timeout=timeout_ms) as download_info:
                page.evaluate("export26ASPdf()")

            download = download_info.value
            download.save_as(str(output_pdf))
            context.close()
            browser.close()

    return output_pdf


def main() -> None:
    parser = argparse.ArgumentParser(description="Render Form 26AS PDF from supplied pdfData JSON")
    parser.add_argument("--xhtml", required=True, help="Path to view26AS.xhtml")
    parser.add_argument("--json", required=True, help="Path to pdfData JSON")
    parser.add_argument("--assessment-year", required=True, help="Assessment Year, e.g. 2023-24")
    parser.add_argument("--pan", default="", help="PAN to display in PDF header")
    parser.add_argument("--output", required=True, help="Output PDF path")
    parser.add_argument("--assets", default="assets", help="Directory containing JS/images")
    parser.add_argument(
        "--download-assets",
        action="store_true",
        help="Download missing public JS/image assets referenced by the XHTML",
    )
    args = parser.parse_args()

    result = export_26as_pdf(
        xhtml_path=args.xhtml,
        json_path=args.json,
        output_pdf=args.output,
        assessment_year=args.assessment_year,
        pan=args.pan,
        assets_dir=args.assets,
        download_missing_assets=args.download_assets,
    )
    print(f"PDF written to: {result}")


if __name__ == "__main__":
    main()
