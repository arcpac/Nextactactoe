"use client";
import React, { useEffect } from "react";
import TicTacToe from "./games/TicTacToe";
import GameCount from "@/components/GameCount";
import { useCounterStore } from "./store";

// const setCount = () => {
//   useCounterStore.setState({ gameCount: 22 });
// };

const page = () => {
  return (
    <div>
      <TicTacToe />
    </div>
  );
};

export default page;
