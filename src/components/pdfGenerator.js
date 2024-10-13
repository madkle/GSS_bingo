import React, { useEffect, useState } from "react";
import "../style/bodyStyle.css";
import { PDFDocument, CreateSingleFrontLabel } from "./bingoBoardMaker";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
function PdfGenerator({songs, shuffleList}) {
    console.log(songs);
    
  const [downloadLink, setDownloadLink] = useState(null);
  const songlist = [];
  const createPDF = async (e) => {
    setDownloadLink(
      <PDFDownloadLink
        document={<PDFDocument props={songlist} />}
        fileName={"labelsheet"}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now"
        }
      </PDFDownloadLink>
    );
  };

  return (
    <section id="inputWrapper">
        <input type="number" placeholder="Number of bingo boards"/><br/>
        {/*<label for="twoPerPage">2 brett per ark</label>
        <input name="twoPerPage" type="check"/>*/}
      <button onClick={createPDF}>Generate PDF</button>

      {downloadLink && downloadLink}
    </section>
  );
}
export default PdfGenerator;
