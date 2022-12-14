const game = document.querySelector("#game");

const scoreDisplay = document.getElementById("score");
let score = 0;

const jeopardyCategories = [
  {
    genre: "BRITISH COLUMBIA",
    questions: [
      {
        question: "What is the biggest city in British Columbia?",
        answers: ["Surrey", "Victoria", "Vancouver", "Kelowna"],
        correct: "Vancouver",
        level: "easy",
      },
      {
        question: "Which downtown Vancouver bar is famous amongst NHL players?",
        answers: ["Roxy", "The Diamond", "Keefer Bar", "Granville"],
        correct: "Roxy",
        level: "medium",
      },
      {
        question: "Which is these celebrities is from Vancouver?",
        answers: ["Ryan Gosling", "Nicki Minaj", "Sebastian Maniscalco", "Ryan Reynolds"],
        correct: "Quebec City",
        level: "hard",
      },
    ],
  },
  {
    genre: "ROCKY MOUNTAINS",
    questions: [
      {
        question: "What province in Banff National Park in?",
        answers: ["British Columbia", "Albera", "Saskatchewan", "Ontario"],
        correct: "Alberta",
        level: "easy",
      },
      {
        question: "Which of these areas is famous for houseboating?",
        answers: ["Shuswap", "Panorama", "Fernie", "Kamloops"],
        correct: "Shuswap",
        level: "medium",
      },
      {
        question: "Approximately how many people visit Banff per year?",
        answers: ["1 million", "2 million", "4 million", "10 million"],
        correct: "4 million",
        level: "hard",
      },
    ],
  },
  {
    genre: "PRAIRIES",
    questions: [
      {
        question: "What is the CFL football team in Saskatchewan called?",
        answers: ["Stampeders", "Elks", "Rough Riders", "Rush"],
        correct: "Rough Riders",
        level: "easy",
      },
      {
        question: "What is the capital of Saskatchewan?",
        answers: ["Saskatoon", "Regina", "Prince Albert", "Fredericton"],
        correct: "Regina",
        level: "medium",
      },
      {
        question: "Where are the famous underground tunnels?",
        answers: ["Prince Albert", "Swift Current", "North Battleford", "Moose Jaw"],
        correct: "Moose Jaw",
        level: "hard",
      },
    ],
  },
  {
    genre: "ONTARIO",
    questions: [
      {
        question: "What is the tallest building in Canada?",
        answers: ["CN Tower", "Eiffel Tower", "Empire State Building", "Zamboni Tower"],
        correct: "CN Tower",
        level: "easy",
      },
      {
        question: "What is the second biggest city in Ontario?",
        answers: ["Toronto", "Barrie", "Scarborough", "Ottawa"],
        correct: "Ottawa",
        level: "medium",
      },
      {
        question: "jhuoihjiojh",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "hard",
      },
    ],
  },
  {
    genre: "QUEBEC",
    questions: [
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "easy",
      },
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "medium",
      },
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "hard",
      },
    ],
  },
  {
    genre: "ATLANTIC CANADA",
    questions: [
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "easy",
      },
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "medium",
      },
      {
        question: "Where is the capital of Quebec?",
        answers: ["Montreal", "Quebec City", "Yo", "Boom"],
        correct: "Quebec City",
        level: "hard",
      },
    ],
  },
];

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerText = category.genre;

  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (question.level === "easy") {
      card.innerHTML = 100;
    }
    if (question.level === "medium") {
      card.innerHTML = 200;
    }
    if (question.level === "hard") {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-answer-1", question.answers[0]);
    card.setAttribute("data-answer-2", question.answers[1]);
    card.setAttribute("data-answer-3", question.answers[2]);
    card.setAttribute("data-answer-4", question.answers[3]);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());
    card.addEventListener("click", flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "10px";
  this.style.lineHeight = "30px";
  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  textDisplay.innerHTML = this.getAttribute("data-question");
  const firstButton = document.createElement("button");
  const secondButton = document.createElement("button");
  const thirdButton = document.createElement("button");
  const fourthButton = document.createElement("button");
  firstButton.classList.add("first-button");
  secondButton.classList.add("second-button");
  thirdButton.classList.add("third-button");
  fourthButton.classList.add("fourth-button");
  firstButton.innerHTML = this.getAttribute("data-answer-1");
  secondButton.innerHTML = this.getAttribute("data-answer-2");
  thirdButton.innerHTML = this.getAttribute("data-answer-3");
  fourthButton.innerHTML = this.getAttribute("data-answer-4");
  firstButton.addEventListener("click", getResult);
  secondButton.addEventListener("click", getResult);
  thirdButton.addEventListener("click", getResult);
  fourthButton.addEventListener("click", getResult);
  this.append(
    textDisplay,
    firstButton,
    secondButton,
    thirdButton,
    fourthButton
  );

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));
  const cardOfButton = this.parentElement;
  cardOfButton.classList.add("display-score");

  if (cardOfButton.getAttribute("data-correct") === this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.style.fontSize = "30px";
      cardOfButton.style.display = "grid";
      cardOfButton.style.placeItems = "center";
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.style.fontSize = "30px";
      cardOfButton.style.display = "grid";
      cardOfButton.style.placeItems = "center";
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", flipCard);
}
