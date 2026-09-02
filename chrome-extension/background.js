// Chrome Extension Service Worker (background.js)

let pendingData = null;
let pendingResponseCallbacks = {};

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.action === "PING") {
    sendResponse({ status: "PONG" });
    return true;
  }

  if (message.action === "GENERATE_PDF") {
    const key = `${message.payload.pan}_${message.payload.ay}`;
    pendingData = {
      jsonData: message.payload.taxData,
      pan: message.payload.pan,
      ay: message.payload.ay,
      assesseeName: message.payload.assesseeName,
      address1: message.payload.address1,
      address2: message.payload.address2,
      panStatus: message.payload.panStatus,
      shouldReturnData: message.payload.shouldReturnData,
      key: key
    };

    if (message.payload.shouldReturnData) {
      pendingResponseCallbacks[key] = sendResponse;
    }

    // Close any existing offscreen document first to prevent the
    // "Only a single offscreen document may be created" exception.
    chrome.offscreen.closeDocument()
      .catch(() => {}) // Ignore error if no offscreen document is open
      .then(() => {
        return chrome.offscreen.createDocument({
          url: chrome.runtime.getURL("pdf_renderer.html"),
          reasons: ["DOM_PARSER"],
          justification: "Render Form 26AS PDF silently using pdfMake in a background DOM"
        });
      })
      .then(() => {
        if (!message.payload.shouldReturnData) {
          sendResponse({ status: "started" });
        }
      })
      .catch((err) => {
        console.error("Offscreen document creation failed:", err);
        sendResponse({ status: "failed", error: err.message });
        delete pendingResponseCallbacks[key];
      });

    return true; // Keep the message channel open for asynchronous sendResponse
  }
});

// Listen to internal messages from the offscreen renderer
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GET_RENDER_DATA") {
    sendResponse(pendingData);
    pendingData = null;
    return true;
  }

  if (message.action === "PDF_RENDERED") {
    const cb = pendingResponseCallbacks[message.key];
    if (cb) {
      cb({ status: "success", data: message.data, filename: message.filename });
      delete pendingResponseCallbacks[message.key];
    }
    chrome.offscreen.closeDocument().catch(() => {});
    return true;
  }

  if (message.action === "TRIGGER_DOWNLOAD") {
    const dataUrl = `data:application/pdf;base64,${message.data}`;
    chrome.downloads.download({
      url: dataUrl,
      filename: message.filename,
      saveAs: false
    }, () => {
      chrome.offscreen.closeDocument().catch(() => {});
    });
    return true;
  }

  if (message.action === "DOWNLOAD_COMPLETE") {
    if (message.error) {
      console.error("Offscreen PDF generation error:", message.error);
    }
    chrome.offscreen.closeDocument().catch(() => {});
    return true;
  }
});
