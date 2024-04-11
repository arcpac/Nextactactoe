import { Button } from "@/components/ui/button";
import React from "react";
interface Props {
  onRestart?: () => void;
  winner?: string;
  hasDraw?: boolean;
}
const Gameover = ({ winner, hasDraw, onRestart }: Props) => {
  console.log("hasDraw", hasDraw);
  return (
    <div>
      {winner && <p>{winner} won!</p>}
      {hasDraw && <p className="text-destructive">Draw!</p>}
      <Button onClick={onRestart}>Restart</Button>
    </div>
  );
};

export default Gameover;
