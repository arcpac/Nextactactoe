import React from "react";
import { Button } from "@/components/ui/button";
import "./styles/GameBoard.css";

interface GameBoardProps {
  onSelect: any;
  board: (string | null)[][];
}

const GameBoard = ({ onSelect, board }: GameBoardProps) => {
  return (
    <ol id="game-board">
      {board.map((row: (string | null)[], rowIndex: number) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol: (string | null), colIndex: number) => (
              <li key={colIndex}>
                <Button
                  onClick={() => onSelect(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </Button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
