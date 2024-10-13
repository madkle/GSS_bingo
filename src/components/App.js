import InputLists  from "./InputSongs";
import SpotifyShit from "./spotipiss";
import "../style/App.css";
function App() {

  return (
    <div className="App">
      <header className="App-header"><h1>Velkommen til musikkbingo generatoren!</h1></header>
      <SpotifyShit/>
      <br/><br/>
      <InputLists/>
      <footer className="App-header">Footer</footer>
    </div>
  );
}

export default App;
