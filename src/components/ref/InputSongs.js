import React, { useEffect, useState } from "react";
import "../style/inputStyle.css";
import { PDFDocument, CreateSingleFrontLabel } from "../frontLabelMaker";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
function InputLists() {
  const [songlist, setSonglist] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);

  // Scramble (shuffle) the songlist
  const shuffleList = () => {
    let shuffled = songlist
      .map((value) => ({ value, sort: Math.random() })) // Map each song to an object with a random sort value
      .sort((a, b) => a.sort - b.sort) // Sort the songs by the random value
      .map(({ value }) => value); // Map back to the song name

    setSonglist(shuffled); // Update the state with the scrambled songlist
    console.log(shuffled); // Log the shuffled list
  };

  const [downloadLink, setDownloadLink] = useState(null);

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
    <div id="inputContainer">
      <section id="musicContainer">
        
      </section>
      <section id="inputWrapper">
        <button onClick={shuffleList}>Scramble Songs</button>
        <br />
        <br />
        <br />
        <button onClick={createPDF}>Generate PDF</button>

        {downloadLink && downloadLink}
      </section>
    </div>
  );
}
export default InputLists;
