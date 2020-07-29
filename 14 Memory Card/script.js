const clearBtn = document.getElementById("clear-cards");
const addCardBtn = document.getElementById("add-card");
let cardsContainer = document.getElementById("cards-container");
const prevCardBtn = document.getElementById("prev-card");
const nextCardBtn = document.getElementById("next-card");
const currentCard = document.getElementById("card-number");
const cardNumberTotal = document.getElementById("card-number-total");
const cardsNavigation = document.querySelector(".cards-navigation");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const storedCards = JSON.parse(localStorage.getItem("cards"));
let cards = [];
if (storedCards) {
  cards = storedCards;
} else {
  cards = [
    {
      id: 1,
      question: "What is PHP?",
      answer: "A 1 programming language",
    },
    {
      id: 2,
      question: "What is JS?",
      answer: "A 2 programming language",
    },
    {
      id: 3,
      question: "What is C#?",
      answer: "A 3 programming language",
    },
    {
      id: 4,
      question: "What is Perl?",
      answer: "A 4 programming language",
    },
  ];
}

let index = 0;
const createCard = () => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("onclick", "flipCard()");
  card.innerHTML = ` <button id="flip-btn">Flip</button>
  
          <div class="card-title question">
            ${cards[index].question}
          </div>
        </div>`;
  return card;
};
const showCard = () => {
  if (cardsContainer.innerHTML === "") {
    cardsContainer.appendChild(createCard());
  } else {
    cardsContainer.innerHTML = "";
    cardsContainer.appendChild(createCard());
  }
};
let isQuestion = true;
const flipCard = () => {
  if (isQuestion) {
    document.querySelector(".card-title").innerText = cards[index].answer;
    isQuestion = false;
  } else {
    document.querySelector(".card-title").innerText = cards[index].question;
    isQuestion = true;
  }
};
const addNewCard = (e) => {
  e.preventDefault();
  if (question.value.length > 0 && answer.value.length > 0) {
    const newCard = {};
    newCard.id = cards.length + 1;
    newCard.question = question.value;
    newCard.answer = answer.value;
    cards.push(newCard);
    updateNavigation();
    localStorage.setItem("cards", JSON.stringify(cards));
    question.value = "";
    answer.value = "";
    showCard();
  }
};
const updateNavigation = () => {
  if (cards.length > 0) {
    cardsNavigation.classList.add("show");
    currentCard.innerText = index + 1;
    cardNumberTotal.innerText = cards.length;
  }
};
const showPrevCard = () => {
  if (index === 0) {
    cardsContainer.innerHTML = ``;
    index = cards.length - 1;
    updateNavigation();
    createCard();
    showCard();
  } else {
    cardsContainer.innerHTML = ``;
    index--;
    updateNavigation();
    createCard();
    showCard();
  }
};
const showNextCard = () => {
  if (index === cards.length - 1) {
    cardsContainer.innerHTML = ``;
    index = 0;
    updateNavigation();
    createCard();
    showCard();
  } else {
    cardsContainer.innerHTML = ``;
    index++;
    updateNavigation();
    createCard();
    showCard();
  }
};
const clearCards = () => {
  cards = [];
  cardsNavigation.classList.remove("show");
  init();
};

const init = () => {
  if (cards.length > 0) {
    showCard();
    updateNavigation();
  } else if (cards.length === 0) {
    index = 0;
    cardsContainer.innerHTML = ``;
    updateNavigation();
  }
};

init();

clearBtn.addEventListener("click", clearCards);
addCardBtn.addEventListener("click", addNewCard);
prevCardBtn.addEventListener("click", showPrevCard);
nextCardBtn.addEventListener("click", showNextCard);
