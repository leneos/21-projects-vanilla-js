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
  console.log(item);
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
    console.log(item.title);
    console.log(item.artist.name);
    getLyrics(item.artist.name, item.title);
  });
  songsContainer.appendChild(songBox);
};

const updateDOM = (data) => {
  if (songsContainer.innerHTML === ``) {
    data.forEach((data) => {
      console.log(data.title);
      createSongBox(data);
    });
  } else {
    createSongBox(data);
  }
};
const getData = () => {
  fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      updateDOM(data.data);
    });
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    songsContainer.style.display = "grid";
    getData();
    input.value = "";
  }
});
