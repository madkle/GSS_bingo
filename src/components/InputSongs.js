import React, { useState } from "react";
import "../style/inputStyle.css";
import BeerForm from "./frontLabelForm.js";

function InputLists() {
  const [songlist, setSonglist] = useState([]);

  // Component to display each song with a remove button
  const DisplaySongList = ({ songName, index }) => {
    const removeSong = () => {
      // Update the songlist immutably by filtering out the removed song
      setSonglist((prevList) => prevList.filter((_, i) => i !== index));
    };

    return (
      <div className="musicWrapper">
        <button onClick={removeSong}>Remove Song</button>
        <p className="musicTitle">{songName}</p>
      </div>
    );
  };

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

  return (
    <div id="inputContainer">
      <section id="musicContainer">
        {/* Render the songlist */}
        {songlist.map((song, i) => (
          <DisplaySongList key={"song" + i} songName={song} index={i} />
        ))}
      </section>
      <section id="inputWrapper">
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
        <button onClick={shuffleList}>Scramble Songs</button>
        <BeerForm />
      </section>
    </div>
  );
}

export default InputLists;
