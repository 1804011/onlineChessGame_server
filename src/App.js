import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const _ = require('lodash')
const socket = io('https://onlinechessserver-production.up.railway.app')
// import PlayRandomMoveEngine from "./chess";

export default function App() {

  const [game, setGame] = useState(new Chess());
  const [draggable, setDraggable] = useState(true)

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setGame(new Chess(data))
      setDraggable(true)
    })
  }, [socket])
  const onDrop = (source, target) => {
    console.log(source, target);
    const newGame = _.cloneDeep(game)
    console.log(newGame)
    const result = newGame?.move({ from: source, to: target });
    console.log(result);
    if (result != null) {
      newGame.put({ type: result.piece, color: result.color }, target);
      socket.emit('sendMessage', newGame.fen())
      setDraggable(false)
      setGame(newGame)
    }
  }


  return (
    <>
      <div>
        draggable:{draggable && 'yes'}
      </div>
      <div style={
        {
          display: "flex",
          justifyContent: "center",
          marginTop: "48px"
        }

      }>

        <Chessboard position={game.fen()} onPieceDrop={onDrop}
          arePiecesDraggable={draggable}
        // boardOrientation={game.turn() == 'w' ? 'white' : "black"}
        />
      </div>
    </>
  );
}