"use client";
import GameBoard from "@/components/games/tictactoe/GameBoard";
import Log from "@/components/games/tictactoe/Log";
import Player from "@/components/games/tictactoe/Player";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { WINNING_COMBINATIONS } from "@/components/games/tictactoe/winning-combinations";
import Gameover from "@/components/games/tictactoe/Gameover";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  console.log("players", players);
  const [gameTurns, setGameTurns] = useState<GameTurnProps[]>([]);
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  const activePlayer = deriveActivePlayer(gameTurns);

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
    )
      winner = players[firstSquareSymbol as keyof PlayerStateProps];
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
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
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <Image
          src="https://img.freepik.com/free-vector/hands-holding-pencils-play-tic-tac-toe-people-drawing-crosses-noughts-simple-game-children-flat-vector-illustration-strategy-concept-banner-website-design-landing-web-page_74855-24786.jpg?w=900&t=st=1712658595~exp=1712659195~hmac=a5f7a17b84eac123c5be6903976cbdc078e6b2f313bb64bf155d0359b23b56ed"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
        />
      </AspectRatio>
      <CardHeader>
        <div className="text-center">
          <CardTitle>
            <div>TicTacToe</div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
            >
              {dark ? <Moon /> : <Sun />}
            </Button>
          </CardTitle>
          <CardDescription>This game is made up of T3 Stack </CardDescription>
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
                onRestart={handleRestart}
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
