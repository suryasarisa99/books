import React from "react";
// import pdfFile from "../assets/jannu.pdf";
export default function PdfViewer() {
  const pdfFile = "/src/assets/jannu.pdf"; // Replace with your PDF file path

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <embed src={pdfFile} type="application/pdf" width="100%" height="100%" />
    </div>
  );
}
