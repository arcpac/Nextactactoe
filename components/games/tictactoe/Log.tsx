import React from "react";
import './styles/Log.css'

const Log = ({ turns }: any) => {
  return (
    <ol id="log">
      {turns.map((turn: any) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          Player {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
};
``;

export default Log;
