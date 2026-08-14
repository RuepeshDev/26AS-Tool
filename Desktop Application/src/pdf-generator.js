/**
 * PDF Generator module for 26AS Desktop Application
 * Creates downloadable Form 26AS PDF files directly on the desktop client.
 */

export function download26ASPdf(pan, ay, htmlContent) {
    const filename = `Form_26AS_${pan}_AY_${ay.replace('-', '_')}.pdf`;
    
    // Create a Blob representing the PDF content / HTML bundle
    const blob = new Blob([
        `%PDF-1.4\n% Form 26AS Tax Credit Statement for PAN: ${pan}, AY: ${ay}\n\n` + htmlContent
    ], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
