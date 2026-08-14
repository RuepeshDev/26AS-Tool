// Extension Data Receiver Bootstrap
(function() {
  // Mock server calls immediately
  window.fnLoad26AS = function() {};
  window.insertAudit = function() {};
  
  // Intercept pdfMake.createPdf to redirect download through extension downloads API
  const checkPdfMakeInterval = setInterval(() => {
    if (window.pdfMake && window.pdfMake.createPdf) {
      clearInterval(checkPdfMakeInterval);
      const originalCreatePdf = window.pdfMake.createPdf;
      window.pdfMake.createPdf = function(docDefinition) {
        const pdfDoc = originalCreatePdf(docDefinition);
        pdfDoc.download = function(fileName) {
          pdfDoc.getBase64((base64Data) => {
            chrome.runtime.sendMessage({
              action: "DOWNLOAD_PDF",
              data: base64Data,
              filename: fileName
            });
          });
        };
        return pdfDoc;
      };
    }
  }, 50);

  document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ action: "GET_RENDER_DATA" }, (response) => {
      if (!response || !response.jsonData) {
        console.error("No render data received from extension worker");
        return;
      }
      
      // Populate target elements and globals
      window.pdfData = response.jsonData;
      window.assYrSelVal = String(response.ay || '').substring(0, 4);
      
      const panEl = document.getElementById("pan");
      if (panEl) panEl.textContent = response.pan || "";
      
      const ayEl = document.getElementById("assessYearSelectedVal");
      if (ayEl) ayEl.textContent = response.ay || "";
      
      // Trigger the original TRACES exporter
      if (typeof export26ASPdf === "function") {
        setTimeout(() => {
          try {
            export26ASPdf();
          } catch (e) {
            console.error("PDF generation failed:", e);
          }
        }, 500);
      } else {
        console.error("export26ASPdf function not found!");
      }
    });
  });
})();
