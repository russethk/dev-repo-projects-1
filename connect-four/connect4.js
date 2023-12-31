
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({length: WIDTH }));
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const board = document.getElementById('board');
 
  // Create the board top row and add a click event listeners to the top cells
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // Generate main part of board
  // Loop through board array and create nested array with table rows ([y] of (board[y][x])
  // and table data td cells ([x] of (board[y][x])

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);  // set cell ID with y,x values
      row.append(cell);
    }
      board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// If board y is empty, return y, or return null if filled

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
 const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check that board is filled and is tie game. 
  // use every() method to check that every row in the board returns a value (i.e. is not null)
  // and every cell in every row returns a value (i.e. is not null)
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

function gameReset() {
  const resetButton = document.createElement("button");
  resetButton.innerText = "RESET";
  scorecard.append(resetButton);
  resetButton.addEventListener('click',()=>{ location.reload()})

  const p1icon = document.createElement('div');
  const p2icon = document.createElement('div');
  const p1text = document.createElement('p');
  const p2text = document.createElement('p');
  
  p1icon.classList.add('p1icon');
  p2icon.classList.add('p2icon');
  p1text.classList.add('p1text');
  p1text.classList.add('p2text');
  p1text.innerText = "Player 1";
  p2text.innerText = "Player 2";

  scorecard.append(p1icon);
  scorecard.append(p1text);
  scorecard.append(p2icon);
  scorecard.append(p2text);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
} 
makeBoard();
makeHtmlBoard();
gameReset();
