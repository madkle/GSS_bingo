import React, { useState, useRef } from "react";
import { PDFFile, CreateSingleFrontLabel } from "./frontLabelMaker";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const BeerForm = () => {
  const [downloadLink, setDownloadLink] = useState(null);
  const [previewLabel, setPreview] = useState(null);
  const beerNameInput = useRef("");
  const beerTypeInput = useRef("");
  const brewersInput = useRef("");

  const fileB64 = useRef("");
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (readEvent) => {
        fileB64.current = readEvent.target.result;
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const frontLabelInfo = {
        beerName: beerNameInput.current.value,
        beerType: beerTypeInput.current.value,
        brewers: brewersInput.current.value,
        file: fileB64.current,
      };

      setDownloadLink(
        <PDFDownloadLink
          document={<PDFFile FrontLabelInfo={frontLabelInfo} />}
          fileName={
            frontLabelInfo.beerName !== ""
              ? frontLabelInfo.beerName
              : "labelsheet"
          }
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now"
          }
        </PDFDownloadLink>
      );

      setPreview(
        <PDFViewer height={"100%"} width={"100%"} showToolbar={false}>
          <CreateSingleFrontLabel FrontLabelInfo={frontLabelInfo} />
        </PDFViewer>
      );
    } catch (error) {
      console.log(error);
    }
  };

  //styles

  const mainContainer = {
    display: "flex",
    flexDirection: "row",
    height: "420px",
    gap: "16px",
  };
  const formStyle = {
    border: "solid 1px #000",
    width: "50%",
    height: "100%",
  };
  const PreviewStyle = {
    border: "solid 1px #000",
    width: "50%",
    height: "100%",
  };

  return (
    <>
      <div style={mainContainer}>
        <div style={formStyle}>
          <p>
            Bruk en frittstående bindestrek ( - ) for å legge til tekstbryting
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="inpBeerName">beerName </label>
            <input
              id="inpBeerName"
              type="text"
              placeholder="beerName"
              ref={beerNameInput}
            />
            <br></br>
            <label htmlFor="inpBeerType">beerType </label>
            <input
              id="inpBeerType"
              type="text"
              placeholder="beerType"
              ref={beerTypeInput}
            />
            <br></br>
            <label htmlFor="inpBrewers">brewers </label>
            <input
              id="inpBrewers"
              type="text"
              placeholder="brewers"
              ref={brewersInput}
            />
            <br></br>
            <label htmlFor="inpArt">label art </label>
            <input id="inpArt" type="file" onChange={handleFileInput} />
            <br></br>
            <button type="submit">Generate PDF</button>
          </form>
          {downloadLink && downloadLink}
        </div>
        <div style={PreviewStyle}>{previewLabel}</div>
      </div>
    </>
  );
};

export default BeerForm;