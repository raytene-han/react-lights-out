import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { createBoard, hasWon, flipNeighboringCells } from "./utils";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 7, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));


  function flipCellsAround(coord) {
    setBoard(oldBoard => flipNeighboringCells(coord, oldBoard, nrows, ncols));
  }

  return (
    <div>
      <table>
        <tbody>
          {board.map((row, y) => {
            return (<tr key={y}>
              {row.map((cell, x) =>
                <Cell flipCellsAroundMe={flipCellsAround}
                  isLit={cell}
                  coord={`${y}-${x}`}
                  key={`${y}-${x}`} />
              )}
            </tr>);
          })}
        </tbody>
      </table>

      {hasWon(board) && <h3>You won!</h3>}
    </div>
  );
}

export default Board;
