let squares = document.getElementById("square");
let board = document.querySelectorAll(".square");
let reset = document.getElementById("reset");
let status = document.getElementById("status");
let player1 = "O";
let player2 = "X";
let currentPlayer = player1;

function resetGame() {
  board.forEach((square) => {
    square.innerHTML = "";
  });
}

reset.addEventListener("click", resetGame);

board.forEach((square) => {
  square.addEventListener("click", function () {
    if (square.innerHTML === "") {
      square.innerHTML = currentPlayer;
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
      status.innerHTML = `Turno de: ${currentPlayer}`;
    }
    if (checkWinner() === true) {
      Swal.fire({
        title: "Winner",
        text: "Jugador " + winner() + " ha ganado!",
        icon: "success",
        confirmButtonText: "Jugar de nuevo",
      }).then(function (isConfirm) {
        if (isConfirm) {
          resetGame();
        }
      });
    }
  });
});

const winner = () => {
  if (currentPlayer === player1) {
    return player2;
  } else {
    return player1;
  }
};

function checkWinner() {
  let winner = false;
  let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombination.forEach((combination) => {
    let square1 = board[combination[0]].innerHTML;
    let square2 = board[combination[1]].innerHTML;
    let square3 = board[combination[2]].innerHTML;
    if (square1 !== "" && square1 === square2 && square2 === square3) {
      winner = true;
    }
  });

  return winner;
}
