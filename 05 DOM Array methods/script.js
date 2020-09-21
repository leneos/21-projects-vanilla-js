const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showmillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

const formatMoney = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const updateDOM = (providedData = data) => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach((item) => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(el);
  });
};

const addData = (obj) => {
  data.push(obj);
  updateDOM();
};
const doubleMoney = () => {
  data.map((item) => {
    item.money = item.money * 2;
  });
  updateDOM();
};
const showMillionaires = () => {
  data = data.filter((item) => item.money > 1000000);
  updateDOM();
};
const sortByRichest = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
};
const calculateWealth = () => {
  const totalWealthContainer = document.createElement("div");
  const totalWealth = data.reduce((a, b) => (a += b.money), 0);
  totalWealthContainer.innerHTML = `<h3>Total wealth is: ${formatMoney(
    totalWealth
  )}</h3>`;

  main.appendChild(totalWealthContainer);
};
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
};
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showmillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
