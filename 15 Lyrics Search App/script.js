const input = document.getElementById("input");
const button = document.getElementById("search-btn");
const songsContainer = document.querySelector(".songs-container");
const updateDOM = (item) => {
  const songBox = document.createElement("div");
  songBox.classList.add("song");
  songBox.innerHTML = `<p>${item.data[0].artist.name}</p>`;
  songsContainer.appendChild(songBox);
};
const getData = () => {
  fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateDOM(data);
    });
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});
