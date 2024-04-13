import { useCounterStore } from "@/app/store";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  setGameTurn?: (arg?: any[]) => void;
  winner?: string;
  hasDraw?: boolean;
}

const Gameover = ({ winner, hasDraw, setGameTurn }: Props) => {
  const increment = useCounterStore((state) => state.increment)
  const test = () => {
    increment(); // Invoke the increment function
    setGameTurn && setGameTurn([]); // Invoke the setGameTurn function with an empty array if it's defined
  };
  return (
    <div>
      {winner && <p>{winner} won!</p>}
      {hasDraw && <p className="text-destructive">Draw!</p>}
      <Button onClick={test}>Restart</Button>
    </div>
  );
};

export default Gameover;
