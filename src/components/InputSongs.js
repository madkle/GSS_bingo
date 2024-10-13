import React, { useEffect, useState } from "react";
import "../style/inputStyle.css";
import { PDFDocument, CreateSingleFrontLabel } from "./frontLabelMaker";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
function InputLists() {
  const [songlist, setSonglist] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);

  
  // Add a single song from input
  const addSong = () => {
    let song = document.getElementById("musicInp").value.trim();
    if (song === "") {
      return;
    }

    // Update the songlist state immutably
    setSonglist((prevList) => [...prevList, song]);

    document.getElementById("musicInp").value = ""; // Clear input field
  };

  // Add multiple songs from the textarea input
  const convertBigList = () => {
    let bigList = document.getElementById("bigList").value.trim();
    if (bigList === "") {
      return;
    }

    let newSongs = bigList.split("\n").filter((song) => song.trim() !== ""); // Split by new line and remove empty strings

    // Update the songlist state immutably with new songs
    setSonglist((prevList) => [...prevList, ...newSongs]);

    document.getElementById("bigList").value = ""; // Clear textarea
  };

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
    const frontLabelInfo = {
      beerName: "Dummy",
      beerType: "Øl",
      brewers: "0237",
      file: "",
    };

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
        {/* Render the songlist */}
        {/*songlist.map((song, i) => (
          <DisplaySongList key={"song" + i} songName={song} index={i} />
        ))*/}
      </section>
      <section id="inputWrapper">
        {/*
        <div>
          Input Alone <br />
          <input type="text" id="musicInp" />
          <button onClick={addSong}>Submit</button>
        </div>

        <div>
          Textarea input
          <br />
          <textarea id="bigList" cols={25} rows={10}></textarea>
          <br />
          <button onClick={convertBigList}>Submit</button>
          <br />
          <br />
        </div>
        */}

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
/*
const APIController = (function () {
  const clientID = "da23bdf5b4334272a1dc8e48abb73409";
  const clientSecret = "cfc99605c4324f83a2e5759931e707ec";

  //private methods
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa(clientID + ":" + clientSecret)
      },
      body:"grant_type=client_credentials"
    });
    
    const data = await result.json();
    return data.access_token
  };

  const _getGeneres = async (token) =>{
    const result = await fetch("https://api.soptify.com/v1/browse/categories?locale=sv_US", {
      method: "GET",
      headers: {"Authorization" : "Bearer " + token}
    });

    const data = await result.json();
    return data.categproes.items;
  }
})();
*/
export default InputLists;
