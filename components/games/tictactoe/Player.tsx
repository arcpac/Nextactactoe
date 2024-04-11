import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  initialName: string;
  isActive: boolean;
  symbol: string;
  onChangeName: (symbol: string, newName: string) => void;
}

function capitaliseLetter(str: string) {
  return str.charAt(0).toUpperCase();
}

const Player = ({ initialName, symbol, isActive, onChangeName }: Props) => {
  const [isEditing, setIsEditiing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditiing((editing) => !isEditing);

    if (isEditing) onChangeName(symbol, playerName);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPlayerName(e.target.value);
  }

  let editableName = <div className="w-full">{playerName}</div>;
  if (isEditing)
    editableName = (
      <Input
        placeholder="Enter game name"
        value={playerName}
        onChange={handleChange}
      />
    );

  return (
    <div className={`flex-1 gap-1`}>
      <div className="grid grid-flow-col">
        <div
          className={`flex p-1 ${
            isActive ? ` bg-gray-300 rounded-lg` : ""
          } align-middle`}
        >
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{capitaliseLetter(symbol)}</AvatarFallback>
          </Avatar>
          <div className="flex justify-center items-center mx-auto">{editableName}</div>
        </div>
        <div>
          <Button
            className="mx-2 rounded-full"
            variant="outline"
            onClick={handleEditClick}
          >
            {isEditing ? "Save" : "Change name"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Player;
