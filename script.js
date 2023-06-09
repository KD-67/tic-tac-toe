// DOM elements:
const nameSubmitBtn = document.querySelector("#name-submit-btn");
const beginGameBtn = document.querySelector("#begin-game-btn");
const restartGameBtn = document.querySelector("#restart-game-btn");

const player1Input = document.querySelector("#player1-name");
const player2Input = document.querySelector("#player2-name");

const alertMessage = document.querySelector("#alert-message");

const gamesquares = document.querySelectorAll(".gamesquare");
const gamesquare1 = document.querySelector("#gamesquare1");
const gamesquare2 = document.querySelector("#gamesquare2");
const gamesquare3 = document.querySelector("#gamesquare3");
const gamesquare4 = document.querySelector("#gamesquare4");
const gamesquare5 = document.querySelector("#gamesquare5");
const gamesquare6 = document.querySelector("#gamesquare6");
const gamesquare7 = document.querySelector("#gamesquare7");
const gamesquare8 = document.querySelector("#gamesquare8");
const gamesquare9 = document.querySelector("#gamesquare9");
const gamesquareMarks = document.querySelectorAll(".gamesquareMark");
const gamesquareMark1 = document.querySelector("#gamesquare-mark1");
const gamesquareMark2 = document.querySelector("#gamesquare-mark2");
const gamesquareMark3 = document.querySelector("#gamesquare-mark3");
const gamesquareMark4 = document.querySelector("#gamesquare-mark4");
const gamesquareMark5 = document.querySelector("#gamesquare-mark5");
const gamesquareMark6 = document.querySelector("#gamesquare-mark6");
const gamesquareMark7 = document.querySelector("#gamesquare-mark7");
const gamesquareMark8 = document.querySelector("#gamesquare-mark8");
const gamesquareMark9 = document.querySelector("#gamesquare-mark9");

const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");

let player1name = "";
let player2name = "";

// Gameplay Variables:

let players = [];
let currentPlayer;
let gameOver = true;
let winner;

// Factories:

const playerFactory = (name, mark) => {
  return {
    name,
    mark,
  };
};

// Modules:

const Gameboard = (() => {
  const field = ["", "", "", "", "", "", "", "", ""];
  return {
    field,
  };
})();

const Game = (() => {
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
      gamesquareMark1.innerHTML = "";
      gamesquareMark2.innerHTML = "";
      gamesquareMark3.innerHTML = "";
      gamesquareMark4.innerHTML = "";
      gamesquareMark5.innerHTML = "";
      gamesquareMark6.innerHTML = "";
      gamesquareMark7.innerHTML = "";
      gamesquareMark8.innerHTML = "";
      gamesquareMark9.innerHTML = "";

      gamesquares.forEach((square) => (square.style.backgroundColor = "white"));

      alertMessage.innerText =
        "Let's get started! " + player1name + " please make your first move!";
    }
  };

  const move = (index) => {
    if (currentPlayer === 1) {
      Gameboard.field[index] = "X";
      gamesquareMarks[index].innerText = "X";
      currentPlayer = 2;
      alertMessage.innerText = "It's " + player2name + "'s move. Place your O!";
    } else if (currentPlayer === 2) {
      Gameboard.field[index] = "O";
      gamesquareMarks[index].innerText = "O";
      currentPlayer = 1;
      alertMessage.innerText = "It's " + player1name + "'s move. Place your X!";
    }

    checkWin();
    if (gameOver === true && winner == "draw") {
      currentPlayer = 0;
      alertMessage.innerText = "GAME OVER, it's a draw!";
    } else if (gameOver === true) {
      currentPlayer = 0;
      alertMessage.innerText = "GAME OVER! " + winner + " wins!";
    }
  };

  const checkWin = () => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      const marks = [
        Gameboard.field[a],
        Gameboard.field[b],
        Gameboard.field[c],
      ];

      if (marks.every((mark) => mark === "X")) {
        gameOver = true;
        winner = player1name;
        return players[0];
      }

      if (marks.every((mark) => mark === "O")) {
        gameOver = true;
        winner = player2name;
        return players[1];
      }
    }

    if (Gameboard.field.every((mark) => mark !== "")) {
      gameOver = true;
      winner = "draw";
      return "draw";
    }

    return null;
  };

  const resetGame = () => {
    currentPlayer = 1;

    gameOver = false;

    Gameboard.field.fill("");

    gamesquareMarks.forEach((mark) => (mark.innerText = ""));

    alertMessage.innerText = player1name + ", place your first X to begin!";
  };

  return {
    start,
    move,
    checkWin,
    resetGame,
  };
})();

// Buttons:

nameSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  player1name = player1Input.value;
  player2name = player2Input.value;

  name1.innerText = player1Input.value;
  name2.innerText = player2Input.value;
  alertMessage.innerText =
    "Welcome " +
    player1Input.value +
    " and " +
    player2Input.value +
    "! Press 'Begin new game!' to start playing!";
});

beginGameBtn.addEventListener("click", (e) => {
  e.preventDefault();

  Game.start();
});

restartGameBtn.addEventListener("click", (e) => {
  e.preventDefault();

  Game.resetGame();
});

// Clicking on a gamesquare during gameplay:

gamesquares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (Gameboard.field[index] === "") {
      Game.move(index);
    }
  });
});
