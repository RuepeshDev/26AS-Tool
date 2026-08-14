// Sandbox Data Receiver and Interceptor Bootstrap
(function() {
  // Mock TRACES server calls immediately
  window.fnLoad26AS = function() {};
  window.insertAudit = function() {};
  
  let currentPan = "";
  let currentAY = "";

  // Intercept pdfMake.createPdf to send base64 data back to offscreen parent page
  const checkPdfMakeInterval = setInterval(() => {
    if (window.pdfMake && window.pdfMake.createPdf) {
      clearInterval(checkPdfMakeInterval);
      const originalCreatePdf = window.pdfMake.createPdf;
      window.pdfMake.createPdf = function(docDefinition) {
        const pdfDoc = originalCreatePdf.call(window.pdfMake, docDefinition);
        pdfDoc.download = function(fileName) {
          // Construct custom filename: 26_pan_assessment_year
          const cleanPan = (currentPan || "").trim().toUpperCase();
          const cleanAY = (currentAY || "").trim();
          const customFileName = `26_${cleanPan}_${cleanAY}.pdf`;

          pdfDoc.getBase64((base64Data) => {
            window.parent.postMessage({
              action: "DOWNLOAD_PDF",
              data: base64Data,
              filename: customFileName
            }, "*");
          });
        };
        return pdfDoc;
      };
    }
  }, 50);

  // Helper to compute Financial Year from Assessment Year
  function getFinancialYear(ay) {
    if (!ay || ay.length < 4) return "";
    const startAY = parseInt(ay.substring(0, 4));
    if (isNaN(startAY)) return "";
    const startFY = startAY - 1;
    const endFY = startAY.toString().substring(2);
    return startFY + "-" + endFY;
  }

  // Listen to message events from parent window (pdf_renderer.html)
  window.addEventListener("message", (event) => {
    const { action, jsonData, pan, ay, assesseeName, address1, address2, panStatus } = event.data;
    
    if (action === "RENDER_PDF") {
      currentPan = pan;
      currentAY = ay;

      // Set the global parameters needed by export26ASPdf()
      window.pdfData = jsonData;
      window.assYrSelVal = String(ay || '').substring(0, 4);
      
      // Populate DOM elements read by export26ASPdf()
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
          el.textContent = value || "";
          el.innerHTML = value || "";
        }
      };

      setText("pan", pan);
      setText("assessYearSelectedVal", ay);
      setText("financialYear", getFinancialYear(ay));
      setText("dedPanName", assesseeName);
      setText("inp", assesseeName);
      setText("add1", address1);
      setText("add2", address2);
      setText("panStatus", panStatus);
      
      // Execute the rendering function
      if (typeof export26ASPdf === "function") {
        setTimeout(() => {
          try {
            export26ASPdf();
          } catch (e) {
            console.error("PDF generation failed inside sandbox:", e);
            window.parent.postMessage({
              action: "ERROR",
              error: e.message
            }, "*");
          }
        }, 100);
      } else {
        console.error("export26ASPdf function not found inside sandbox!");
        window.parent.postMessage({
          action: "ERROR",
          error: "export26ASPdf function not found"
        }, "*");
      }
    }
  });

  // Report ready status to parent window after all scripts have loaded
  window.addEventListener("load", () => {
    window.parent.postMessage({ action: "SANDBOX_READY" }, "*");
  });
})();
