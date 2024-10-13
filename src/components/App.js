import { SpotifyShit } from "./spotipiss";
import React, { useState } from "react";
import PdfGenerator from "./pdfGenerator";
import "../style/App.css";
import "../style/bodyStyle.css";
function App() {
  const [songs, setSongs] = useState([]);

  // Scramble (shuffle) the songlist
  const shuffleList = () => {
    let shuffled = songs
      .map((value) => ({ value, sort: Math.random() })) // Map each song to an object with a random sort value
      .sort((a, b) => a.sort - b.sort) // Sort the songs by the random value
      .map(({ value }) => value); // Map back to the song name

    setSongs(shuffled); // Update the state with the scrambled songlist
    //console.log(shuffled); // Log the shuffled list
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Velkommen til musikkbingo generatoren!</h1>
      </header>

      <div id="inputContainer">
        <SpotifyShit setSongs={setSongs} songs={songs} shuffleList={shuffleList}/>
        <PdfGenerator songs={songs} shuffleList={shuffleList}/>
      </div>
      <footer className="App-header">Footer</footer>
    </div>
  );
}

export default App;
