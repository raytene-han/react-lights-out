/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
function createBoard(nrows, ncols, chanceLightStartsOn) {
  let initialBoard = [];

  const row = Array.from({ length: ncols });
  initialBoard = Array.from({ length: nrows }).map(r => [...row]);
  for (let y = 0; y < nrows; y++) {
    for (let x = 0; x < ncols; x++) {
      initialBoard[y][x] = Math.random() < chanceLightStartsOn;
    }
  }

  return initialBoard;
}

/** check if board meets win criteria */
function hasWon(board) {

  for (let row of board) {
    for (let cell of row) {
      if (!cell) return false;
    }
  }

  return true;
}

/** Checks if cells are within board and flips cell values. */
function flipNeighboringCells (coord, oldBoard, nrows, ncols) {
  const [y, x] = coord.split("-").map(Number);

  const flipCell = (y, x, boardCopy) => {
    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      boardCopy[y][x] = !boardCopy[y][x];
    }
  };

  let boardCopy = oldBoard.map(row => [...row]);

  flipCell(y, x, boardCopy);
  flipCell(y - 1, x, boardCopy);
  flipCell(y + 1, x, boardCopy);
  flipCell(y, x - 1, boardCopy);
  flipCell(y, x + 1, boardCopy);

  return boardCopy;
}

export { createBoard, hasWon, flipNeighboringCells };