import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId, filename = "resume.pdf") => {
  const input = document.getElementById(elementId);

  const clone = input.cloneNode(true);

  const base64Image = localStorage.getItem("profileImageBase64");
  if (base64Image) {
    const imgTags = clone.querySelectorAll("img");
    imgTags.forEach((img) => {
      img.src = base64Image;
    });
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.appendChild(clone);
  document.body.appendChild(container);

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = 210;
const pageHeight = 297;

const imgWidth = pageWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
heightLeft -= pageHeight;

while (heightLeft > 5) {
  position = heightLeft - imgHeight;
  pdf.addPage();
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
}

  pdf.save(filename);

  document.body.removeChild(container);
};