"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { WINNING_COMBINATIONS } from "@/components/games/tictactoe/winning-combinations";
import Player from "@/components/games/tictactoe/Player";
import Log from "@/components/games/tictactoe/Log";
import Gameover from "@/components/games/tictactoe/Gameover";
import GameBoard from "@/components/games/tictactoe/GameBoard";
import { Button } from "@/components/ui/button";

import { useCounterStore } from "@/app/store";
import GameCount from "@/components/GameCount";
import ToggleMode from "@/components/ui/ToggleMode";

const initialBoard: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface SquareProps {
  row: number;
  col: number;
}
export interface GameTurnProps {
  player: string;
  square: SquareProps;
}

interface PlayerStateProps {
  [key: string]: string;
}

function deriveActivePlayer(gameturns: any) {
  let currentPlayer = "x";
  if (gameturns.length > 0 && gameturns[0].player === "x") {
    currentPlayer = "o";
  }
  return currentPlayer;
}

const TicTacToe = () => {
  const [players, setPlayers] = useState<PlayerStateProps>({
    x: "Player 1",
    o: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState<GameTurnProps[]>([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const { gameCount, increment } = useCounterStore();

  let gameBoard = [...initialBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol as keyof PlayerStateProps];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function onSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <Card className="">
      <CardHeader>
        <div className="text-center">
          <CardTitle>
            <div>TicTacToe</div>
            <ToggleMode />
          </CardTitle>
          <CardDescription>
            {/* <GameCount gameCount={gameCount} /> */}
            {gameCount}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%">
          <div id="players" className="flex items-center gap-x-1">
            <Player
              initialName="Player 1"
              symbol="x"
              isActive={activePlayer === "x"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName="Player 2"
              symbol="o"
              isActive={activePlayer === "o"}
              onChangeName={handlePlayerNameChange}
            />
          </div>
        </ResponsiveContainer>

        {(winner || hasDraw) && (
          <ResponsiveContainer>
            <div className="flex justify-center items-center h-screen">
              <Gameover
                winner={winner}
                hasDraw={hasDraw}
                setGameTurn={handleRestart}
              />
            </div>
          </ResponsiveContainer>
        )}
        <ResponsiveContainer>
          <GameBoard onSelect={onSelectSquare} board={gameBoard} />
        </ResponsiveContainer>
        <CardFooter>
          <Log turns={gameTurns} />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TicTacToe;
