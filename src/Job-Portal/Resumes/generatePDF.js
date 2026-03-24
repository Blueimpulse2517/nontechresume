import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId, filename = "resume.pdf") => {
  const input = document.getElementById(elementId);

  // Clone element
  const clone = input.cloneNode(true);

  // 🔥 Apply inline fixes (instead of CSS)
  clone.style.width = "794px"; // A4 width in px
  clone.style.padding = "20px";
  clone.style.boxSizing = "border-box";
  clone.style.background = "#fff";

  // Replace image with Base64
  const base64Image = localStorage.getItem("profileImageBase64");
  if (base64Image) {
    const imgTags = clone.querySelectorAll("img");
    imgTags.forEach((img) => {
      img.src = base64Image;
    });
  }

  // Hidden container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.appendChild(clone);
  document.body.appendChild(container);

  // Capture full height
  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    windowWidth: clone.scrollWidth,
    windowHeight: clone.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // 🔥 FIX: avoid extra blank page
  while (heightLeft > 10) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);

  document.body.removeChild(container);
};

