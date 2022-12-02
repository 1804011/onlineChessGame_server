import './App.css'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
const socket = io.connect("https://onlinechessserver-production.up.railway.app");
const cellStyle = {
    fontSize: "48px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    PointerEvent: "none"
}
function App() {

    const roomRef = useRef("1234")
    const [turn, setTurn] = useState(0);
    const [move, setMove] = useState(true);
    const [gameOver, setGameOver] = useState(0)
    const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [status, setStatus] = useState("")
    const joinRoom = (room) => {
        socket.emit('joinRoom', room)
    }

    const putSymbol = (r, c) => {
        if (gameOver) return;
        if (!move) return;
        const newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newBoard[i][j] = board[i][j];
            }
        }
        if (newBoard[r][c] != 0) return;
        newBoard[r][c] = (turn == 0 && 'X') || (turn == 1 && 'O');
        const newTurn = 1 - turn;
        setTurn(newTurn)
        setBoard(newBoard);
        setMove(false);

        socket.emit('sendMessage', {
            room: "1234",
            newBoard,
            turn: 1 - turn,
            gameOver
        })
    }
    const selectPlayer = (flag1) => {
        if (flag1 == 0) return;
        if (flag1 == 'X') {
            let k = 1;
            setGameOver(1);
            setStatus("Player 1 win")


            return 1;
        }
        else {
            let k = 1;
            setGameOver(1);
            setStatus("Player 2 win")

            return 1;
        }

        return 0;

    }
    const gameEnd = () => {
        let cnt = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cnt += (board[i][j] == 0)
            }
        }

        if (board[0][0] == board[0][1] && board[0][1] == board[0][2])
            selectPlayer(board[0][0]) && setGameOver(1);
        if (board[1][0] == board[1][1] && board[1][1] == board[1][2])
            selectPlayer(board[1][0]) && setGameOver(1);
        if (board[2][0] == board[2][1] && board[2][1] == board[2][2])
            selectPlayer(board[2][0]) && setGameOver(1);
        if (board[0][0] == board[1][0] && board[1][0] == board[2][0])
            selectPlayer(board[0][0]) && setGameOver(1);
        if (board[0][1] == board[1][1] && board[1][1] == board[2][1])
            selectPlayer(board[0][1]) && setGameOver(1);
        if (board[0][2] == board[1][2] && board[1][2] == board[2][2])
            selectPlayer(board[0][2]) && setGameOver(1);
        if (board[0][2] == board[1][1] && board[2][0] == board[1][1])
            selectPlayer(board[1][1]) && setGameOver(1);
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2])
            selectPlayer(board[1][1]) && setGameOver(1);
        if (cnt == 0) {
            setStatus("Game drawn")
            setGameOver(1);
        }
    }


    useEffect(() => {
        socket.on('response', (data) => alert(data))
        socket.on('receiveMessage', (data) => {
            if (data?.room == "1234") {
                const { newBoard, turn, gameOver } = data;
                setBoard(newBoard);
                setMove(true);
                setTurn(turn);
                setGameOver(gameOver)

            }
        })
    }, [socket])
    useEffect(gameEnd, [board])




    return (
        <>
            <div style={{
                display: "flex",
                width: "250px",
                margin: "48px auto",

            }}>
                <input type="text" ref={roomRef} value={"1234"}></input>
                <button onClick={() => joinRoom(roomRef.current.value)}>Join room</button>
            </div>
            <div width={250} style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>




                {
                    gameOver ?
                        <div style={{ fontWeight: "bold", fontSize: "36px" }}>{status}</div> :
                        <table border={1} >

                            <tr width={250} style={{ display: "flex" }}>
                                <td style={cellStyle} onClick={() => putSymbol(0, 0)} >
                                    {
                                        board[0][0] != 0 && board[0][0]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(0, 1)}>
                                    {
                                        board[0][1] != 0 && board[0][1]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(0, 2)}>
                                    {
                                        board[0][2] != 0 && board[0][2]
                                    }
                                </td>
                            </tr>
                            <tr width={250} style={{ display: "flex" }}>
                                <td style={cellStyle} onClick={() => putSymbol(1, 0)}>
                                    {
                                        board[1][0] != 0 && board[1][0]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(1, 1)}>
                                    {
                                        board[1][1] != 0 && board[1][1]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(1, 2)}>
                                    {
                                        board[1][2] != 0 && board[1][2]
                                    }
                                </td>
                            </tr>
                            <tr width={250} style={{ display: "flex" }}>
                                <td style={cellStyle} onClick={() => putSymbol(2, 0)}>
                                    {
                                        board[2][0] != 0 && board[2][0]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(2, 1)}>
                                    {
                                        board[2][1] != 0 && board[2][1]
                                    }
                                </td>
                                <td style={cellStyle} onClick={() => putSymbol(2, 2)}>
                                    {
                                        board[2][2] != 0 && board[2][2]
                                    }
                                </td>
                            </tr>



                        </table>

                }

            </div >
        </>
    );
}

// export default App;
