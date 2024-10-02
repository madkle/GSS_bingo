const songlist = [];

const addSong = () => {
  let song = document.getElementById("musicInp").value;
  song.trim();
  if (song === "" || song === " ") {
    return;
  }
  songlist.push(song);
  generateList();
};
const generateList = () => {
  const container = document.getElementById("musicListContainer");

  container.innerHTML = null;
  songlist.forEach((element, i) => {
    const div = document.createElement("div");
    div.setAttribute("class", "musicWrapper");

    const text = document.createElement("p");
    text.setAttribute("class", "musicTitle");
    text.textContent = element;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove song";
    removeButton.addEventListener("click", () => {
      songlist.splice(i, 1);

      generateList();
    });

    div.appendChild(removeButton);
    div.appendChild(text);

    container.appendChild(div);
  });
};

const exportList = () => {
  console.log(songlist);
};

const convertBigList = () => {
  const list = document.getElementById("bigList").value;

  let splitList = list.split("\n");
  splitList.forEach((element) => {
    if (element === "" || element === " ") {
      return;
    }
    element.trim();
    songlist.push(element);
  });
  generateList();
};
const shuffleList = (arrayList) => {
  let unshuffled = songlist;
    if (arrayList !== undefined) {
        unshuffled = arrayList
    }
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log(shuffled);
  return shuffled
};
