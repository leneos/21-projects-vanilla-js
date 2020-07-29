const input = document.getElementById("input");
const button = document.getElementById("search-btn");
const songsContainer = document.querySelector(".songs-container");

async function getLyrics(artist, song) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
  const data = await res.json();
  console.log(data);
  document.querySelector("body").innerHTML = data.lyrics.replace(
    /(\r\n|\r|\n)/g,
    "<br>"
  );
}

const createSongBox = (item) => {
  const songBox = document.createElement("div");
  songBox.classList.add("song");
  songBox.innerHTML = `
  <p>${item.artist.name}</p>
  <p>${item.title}</p>
  <p>${getLyrics(item.artist.name, item.title)}</p>

  `;

  songsContainer.appendChild(songBox);
};

const updateDOM = (data) => {
  if (songsContainer.innerHTML === ``) {
    data.forEach((item) => {
      createSongBox(item);
    });
  } else {
    songsContainer.innerHTML = ``;
    createSongBox(data);
  }
};
const getData = () => {
  fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.data);
      updateDOM(data.data);
    });
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    getData();
  }
});

const btnbtn = document.getElementById("btnbtn");
btnbtn.addEventListener("click", () => {
  getLyrics("U2", "One");
});
