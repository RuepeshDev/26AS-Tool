// Offscreen Parent Script (pdf_renderer.js)
(function() {
  let renderData = null;
  let sandboxReady = false;

  const sendRenderRequest = () => {
    if (renderData && sandboxReady) {
      console.log("Sending RENDER_PDF to sandboxed iframe");
      const sandboxFrame = document.getElementById("sandboxFrame");
      sandboxFrame.contentWindow.postMessage({
        action: "RENDER_PDF",
        jsonData: renderData.jsonData,
        pan: renderData.pan,
        ay: renderData.ay,
        assesseeName: renderData.assesseeName,
        address1: renderData.address1,
        address2: renderData.address2,
        panStatus: renderData.panStatus
      }, "*");
    }
  };

  // Fetch data from extension service worker immediately
  chrome.runtime.sendMessage({ action: "GET_RENDER_DATA" }, (response) => {
    if (!response || !response.jsonData) {
      console.error("No render data received from extension service worker.");
      return;
    }
    renderData = response;
    sendRenderRequest();
  });

  // Listen to message events from sandboxed iframe or background script
  window.addEventListener("message", (event) => {
    const { action, data, filename, error } = event.data;
    
    if (action === "SANDBOX_READY") {
      console.log("Sandbox iframe reported ready");
      sandboxReady = true;
      sendRenderRequest();
    } else if (action === "DOWNLOAD_PDF") {
      if (renderData && renderData.shouldReturnData) {
        // Send base64 data back to background script to return to the portal page
        chrome.runtime.sendMessage({
          action: "PDF_RENDERED",
          data: data,
          filename: filename,
          key: renderData.key
        });
      } else {
        // Send message to background script to perform the download in the SW context
        chrome.runtime.sendMessage({
          action: "TRIGGER_DOWNLOAD",
          data: data,
          filename: filename || "Form26AS.pdf"
        });
      }
    } else if (action === "ERROR") {
      console.error("Error inside sandbox PDF renderer:", error);
      chrome.runtime.sendMessage({ action: "DOWNLOAD_COMPLETE", error: error });
    }
  });
})();
