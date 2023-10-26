"use strict";

const canvasDimention = 630;
const gameWinner = document.querySelector("#winner");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasDimention;
canvas.height = canvasDimention;
function game() {
  let winner = -2,
    blockList = [],
    winningPlayer = "";
  let block11List,
    block12List,
    block13List,
    block21List,
    block22List,
    block23List,
    block31List,
    block32List,
    block33List;

  let turn = 1; //turn of player X
  ctx.beginPath();
  ctx.rect(0, 0, canvasDimention, canvasDimention);
  ctx.fillStyle = "white";
  ctx.fill();
  // Draw line function
  function drawLine(
    moveTo_x,
    moveTo_y,
    lineTo_x,
    lineTo_y,
    lineWidth,
    strokeStyle,
    lineCap
  ) {
    ctx.beginPath();
    ctx.moveTo(moveTo_x, moveTo_y);
    ctx.lineTo(lineTo_x, lineTo_y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = lineCap;
    ctx.stroke();
  }
  // Draw X function
  function drawX(x, y) {
    //here x & y are the top right coordinate of a square of the grid
    // background fill of cross
    ctx.beginPath();
    ctx.rect(x + 5, y + 5, canvasDimention / 3 - 10, canvasDimention / 3 - 10);
    ctx.fillStyle = "white";
    ctx.fill();
    //1st line of cross
    drawLine(
      x + 40,
      y + 40,
      x + canvasDimention / 3 - 40,
      y + canvasDimention / 3 - 40,
      40,
      "#90EE90",
      "round"
    );
    //2nd line of cross
    drawLine(
      x + canvasDimention / 3 - 40,
      y + 40,
      x + 40,
      y + canvasDimention / 3 - 40,
      40,
      "#90EE90",
      "round"
    );
    turn = 0;
  }
  // Draw O function
  function drawO(x, y) {
    ctx.beginPath();
    ctx.rect(x + 5, y + 5, canvasDimention / 3 - 10, canvasDimention / 3 - 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      x + canvasDimention / 6,
      y + canvasDimention / 6,
      canvasDimention / 6 - 15,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      x + canvasDimention / 6,
      y + canvasDimention / 6,
      canvasDimention / 6 - 52,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "white";
    ctx.fill();
    turn = 1;
  }
  // Code to create a SuperTicTacToe board!
  // for (let j = 0; j <= 2; j++) {
  //   for (let i = 0; i <= 7; i++) {
  //     drawLine(
  //       111 * i + 111,
  //       20 + 333 * j,
  //       111 * i + 111,
  //       313 + 333 * j,
  //       7,
  //       "blue",
  //       "round"
  //     );

  //     drawLine(
  //       20 + 333 * j,
  //       111 * i + 111,
  //       313 + 333 * j,
  //       111 * i + 111,
  //       7,
  //       "blue",
  //       "round"
  //     );
  //   }
  // }
  // Preparing the board
  for (let i = 1; i <= 2; i++) {
    drawLine(
      (canvasDimention / 3) * i,
      10,
      (canvasDimention / 3) * i,
      canvasDimention - 10,
      10,
      "red",
      "round"
    );

    drawLine(
      10,
      (canvasDimention / 3) * i,
      canvasDimention - 10,
      (canvasDimention / 3) * i,
      10,
      "red",
      "round"
    );
  }

  // Adding the functionalities
  canvas.addEventListener("mousedown", doMouseDown, false);
  function doMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    const canvs_x = event.clientX - rect.left;
    const canvs_y = event.clientY - rect.top;

    // Defining the blocks
    let block11 =
      canvs_x > 0 &&
      canvs_x < canvasDimention / 3 &&
      canvs_y > 0 &&
      canvs_y < canvasDimention / 3 &&
      !blockList[0];
    let block12 =
      canvs_x > canvasDimention / 3 &&
      canvs_x < (canvasDimention * 2) / 3 &&
      canvs_y > 0 &&
      canvs_y < canvasDimention / 3 &&
      !blockList[1];
    let block13 =
      canvs_x >= (canvasDimention * 2) / 3 &&
      canvs_x <= canvasDimention &&
      canvs_y >= 0 &&
      canvs_y <= canvasDimention / 3 &&
      !blockList[2];
    let block21 =
      canvs_x >= 0 &&
      canvs_x <= canvasDimention / 3 &&
      canvs_y >= canvasDimention / 3 &&
      canvs_y <= (canvasDimention * 2) / 3 &&
      !blockList[3];
    let block22 =
      canvs_x >= canvasDimention / 3 &&
      canvs_x <= (canvasDimention * 2) / 3 &&
      canvs_y >= canvasDimention / 3 &&
      canvs_y <= (canvasDimention * 2) / 3 &&
      !blockList[4];
    let block23 =
      canvs_x >= (canvasDimention * 2) / 3 &&
      canvs_x <= canvasDimention &&
      canvs_y >= canvasDimention / 3 &&
      canvs_y <= (canvasDimention * 2) / 3 &&
      !blockList[5];
    let block31 =
      canvs_x >= 0 &&
      canvs_x <= canvasDimention / 3 &&
      canvs_y >= (canvasDimention * 2) / 3 &&
      canvs_y <= canvasDimention &&
      !blockList[6];
    let block32 =
      canvs_x >= canvasDimention / 3 &&
      canvs_x <= (canvasDimention * 2) / 3 &&
      canvs_y >= (canvasDimention * 2) / 3 &&
      canvs_y <= canvasDimention &&
      !blockList[7];
    let block33 =
      canvs_x >= (canvasDimention * 2) / 3 &&
      canvs_x <= canvasDimention &&
      canvs_y >= (canvasDimention * 2) / 3 &&
      canvs_y <= canvasDimention &&
      !blockList[8];

    if (block11) {
      if (turn === 1) {
        drawX(0, 0);
        block11List = 1;
      } else {
        drawO(0, 0);
        block11List = 2;
      }
    } else if (block12) {
      if (turn === 1) {
        drawX(canvasDimention / 3, 0);
        block12List = 1;
      } else {
        drawO(canvasDimention / 3, 0);
        block12List = 2;
      }
    } else if (block13) {
      if (turn === 1) {
        drawX((canvasDimention * 2) / 3, 0);
        block13List = 1;
      } else {
        drawO((canvasDimention * 2) / 3, 0);
        block13List = 2;
      }
    } else if (block21) {
      if (turn === 1) {
        drawX(0, canvasDimention / 3);
        block21List = 1;
      } else {
        drawO(0, canvasDimention / 3);
        block21List = 2;
      }
    } else if (block22) {
      if (turn === 1) {
        drawX(canvasDimention / 3, canvasDimention / 3);
        block22List = 1;
      } else {
        drawO(canvasDimention / 3, canvasDimention / 3);
        block22List = 2;
      }
    } else if (block23) {
      if (turn === 1) {
        drawX((canvasDimention * 2) / 3, canvasDimention / 3);
        block23List = 1;
      } else {
        drawO((canvasDimention * 2) / 3, canvasDimention / 3);
        block23List = 2;
      }
    } else if (block31) {
      if (turn === 1) {
        drawX(0, (canvasDimention * 2) / 3);
        block31List = 1;
      } else {
        drawO(0, (canvasDimention * 2) / 3);
        block31List = 2;
      }
    } else if (block32) {
      if (turn === 1) {
        drawX(canvasDimention / 3, (canvasDimention * 2) / 3);
        block32List = 1;
      } else {
        drawO(canvasDimention / 3, (canvasDimention * 2) / 3);
        block32List = 2;
      }
    } else if (block33) {
      if (turn === 1) {
        drawX((canvasDimention * 2) / 3, (canvasDimention * 2) / 3);
        block33List = 1;
      } else {
        drawO((canvasDimention * 2) / 3, (canvasDimention * 2) / 3);
        block33List = 2;
      }
    }

    blockList = [
      block11List, // 0
      block12List, // 1
      block13List, // 2
      block21List, // 3
      block22List, // 4
      block23List, // 5
      block31List, // 6
      block32List, // 7
      block33List, // 8
    ];

    gameLogic(blockList);

    // condition for Tie
    let counter = 0;
    for (let i = 0; i <= 8; i++) {
      if (winner !== 1 && blockList[i] !== undefined) counter++;
    }
    if (counter === 9) {
      winner = -1;
      gameWinner.innerText = "Tie!";
    }

    if (winner === 1) {
      canvas.removeEventListener("mousedown", doMouseDown);
      return;
    }
  }

  function gameLogic(blockList) {
    let condition1 =
      blockList[0] === blockList[1] &&
      blockList[0] === blockList[2] &&
      blockList[0] !== undefined;
    let condition2 =
      blockList[3] === blockList[4] &&
      blockList[3] === blockList[5] &&
      blockList[3] !== undefined;
    let condition3 =
      blockList[6] === blockList[7] &&
      blockList[6] === blockList[8] &&
      blockList[6] !== undefined;
    let condition4 =
      blockList[0] === blockList[3] &&
      blockList[0] === blockList[6] &&
      blockList[0] !== undefined;
    let condition5 =
      blockList[1] === blockList[4] &&
      blockList[1] === blockList[7] &&
      blockList[1] !== undefined;
    let condition6 =
      blockList[2] === blockList[5] &&
      blockList[2] === blockList[8] &&
      blockList[2] !== undefined;
    let condition7 =
      blockList[0] === blockList[4] &&
      blockList[0] === blockList[8] &&
      blockList[0] !== undefined;
    let condition8 =
      blockList[2] === blockList[4] &&
      blockList[2] === blockList[6] &&
      blockList[2] !== undefined;

    if (condition1) {
      drawLine(
        30,
        canvasDimention / 6,
        canvasDimention - 30,
        canvasDimention / 6,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 0);
    } else if (condition2) {
      drawLine(
        30,
        canvasDimention / 2,
        canvasDimention - 30,
        canvasDimention / 2,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 3);
    } else if (condition3) {
      drawLine(
        30,
        canvasDimention / 2 + canvasDimention / 3,
        canvasDimention - 30,
        (canvasDimention * 5) / 6,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 6);
    } else if (condition4) {
      drawLine(
        canvasDimention / 6,
        30,
        canvasDimention / 6,
        canvasDimention - 30,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 0);
    } else if (condition5) {
      drawLine(
        canvasDimention / 2,
        30,
        canvasDimention / 2,
        canvasDimention - 30,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 1);
    } else if (condition6) {
      drawLine(
        (canvasDimention * 5) / 6,
        30,
        (canvasDimention * 5) / 6,
        canvasDimention - 30,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 2);
    } else if (condition7) {
      drawLine(
        30,
        30,
        canvasDimention - 30,
        canvasDimention - 30,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 0);
    } else if (condition8) {
      drawLine(
        canvasDimention - 30,
        30,
        30,
        canvasDimention - 30,
        50,
        "blue",
        "round"
      );
      winner = 1;
      whoWin(blockList, 2);
    }
  }
  function whoWin(x, y) {
    if (x[y] === 1) {
      winningPlayer = "X Wins";
    } else if (x[y] === 2) {
      winningPlayer = "O Wins";
    }
    if (winner) {
      gameWinner.innerText = winningPlayer;
    }
  }
}
game();
// nextGame.addEventListener("click", abc());

//

// document.getElementById("nextBtn").addEventListener("click", game());
//
