import React, { useState } from "react";
import SongLists from "./songList";
const Test = ({songName}) => {
  return (
    <div className="musicWrapper">
      <button>Remove Song</button>
      <p className="musicTitle">{songName}</p>
    </div>
  );
};
function InputLists() {
  const [songlist, setSonglist] = useState([]);

  const addSong = () => {
    let song = document.getElementById("musicInp").value.trim();

    if (song === "") {
      return;
    }

    setSonglist((prevList) => [...prevList, song]); // Update the state with the new song
    document.getElementById("musicInp").value = ""; // Clear input field
    console.log(songlist);
  };
  const convertBigList = () => {
    let bigList = document.getElementById("bigList").value.trim();

    if (bigList === "") {
      return;
    }

    let newSongs = bigList.split("\n").filter((song) => song.trim() !== ""); // Split by new line and remove empty strings
    setSonglist((prevList) => [...prevList, ...newSongs]); // Add the new list to the existing songs
    document.getElementById("bigList").value = ""; // Clear textarea
    console.log(songlist);
  };
  return (
    <div>
      <section>
        Input Alone <br></br>
        <input type="text" id="musicInp" />
        <button onClick={addSong}>Submit</button>
      </section>
      <section>
        Textarea input
        <br />
        <textarea id="bigList" cols={25} rows={10}></textarea>
        <br />
        <button onClick={convertBigList}>Submit</button>
        <br />
        <br />
      </section>
      {/*songlist.length !== 0 ? <SongLists/> : console.log("hade")*/}
      <div>
      {songlist.map((song, i) => (
          <Test key={"song" + i} songName={song} />
        ))
      }
      </div>
    </div>
  );
}

export default InputLists;
