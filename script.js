// DOM elements:
const nameSubmitBtn = document.querySelector("#name-submit-btn");
const beginGameBtn = document.querySelector("#begin-game-btn");
const restartGameBtn = document.querySelector("#restart-game-btn");

const player1Input = document.querySelector("#player1-name");
const player2Input = document.querySelector("#player2-name");

const alertMessage = document.querySelector("#alert-message");

const gamesquares = document.querySelectorAll(".gamesquare");
const gamesquare1 = document.querySelector("#gamequare1");
const gamesquare2 = document.querySelector("#gamequare2");
const gamesquare3 = document.querySelector("#gamequare3");
const gamesquare4 = document.querySelector("#gamequare4");
const gamesquare5 = document.querySelector("#gamequare5");
const gamesquare6 = document.querySelector("#gamequare6");
const gamesquare7 = document.querySelector("#gamequare7");
const gamesquare8 = document.querySelector("#gamequare8");
const gamesquare9 = document.querySelector("#gamequare9");

const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");

let player1name = "";
let player2name = "";

// Factories:

const playerFactory = (name, mark) => {
  return {
    name,
    mark,
  };
};

// Modules:

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    players = [
      playerFactory(player1Input.value, "X"),
      playerFactory(player2Input.value, "O"),
    ];

    currentPlayer = 1;
    gameOver = false;

    if (player1name == "" || player2name == "") {
      alertMessage.innerText = "Please provide player names before beginning!";
    } else {
      gamesquare1.innerHTML = "";
      gamesquare2.innerHTML = "";
      gamesquare3.innerHTML = "";
      gamesquare4.innerHTML = "";
      gamesquare5.innerHTML = "";
      gamesquare6.innerHTML = "";
      gamesquare7.innerHTML = "";
      gamesquare8.innerHTML = "";
      gamesquare9.innerHTML = "";

      gamesquares.forEach((square) => (square.style.backgroundColor = "white"));

      alertMessage.innerText =
        "Let's get started! " + player1name + " please make your first move!";
    }
  };

  return {
    start,
  };
})();

// Functionality:

nameSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  player1name = player1Input.value;
  player2name = player2Input.value;

  name1.innerText = player1Input.value;
  name2.innerText = player2Input.value;
});

beginGameBtn.addEventListener("click", (e) => {
  e.preventDefault();

  Game.start();
});
