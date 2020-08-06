const input = document.getElementById("input");
const button = document.getElementById("search-btn");
const songsContainer = document.querySelector(".songs-container");

async function getLyrics(artist, song) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
  const data = await res.json();

  songsContainer.style.display = "block";
  songsContainer.innerHTML = `
  <h2>${song} by ${artist}</h2>
  <p>${data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>")}</>`;
}

const createSongBox = (item) => {
  const songBox = document.createElement("div");
  songBox.classList.add("song");

  songBox.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.artist.name}</p>
  `;

  if (item.album.cover_big !== "") {
    songBox.style.backgroundImage = `url(${item.album.cover_big})`;
  } else {
    songBox.style.backgroundColor = lightpink;
  }
  songBox.addEventListener("click", () => {
    getLyrics(item.artist.name, item.title);
  });
  songsContainer.appendChild(songBox);
};

const updateDOM = (data) => {
  songsContainer.innerHTML = ``;
  data.forEach((item) => {
    createSongBox(item);
  });
};
const getData = () => {
  fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateDOM(data.data);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    getData();
    songsContainer.style.display = "grid";
    input.value = "";
  }
});
