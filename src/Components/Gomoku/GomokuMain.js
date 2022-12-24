import React, { useEffect, useState } from 'react';
import minimax from '../../GameObjects/AI';
import Gomoku from '../../GameObjects/Gomoku';
import GomokuBoard from './GomokuBoard';

const GomokuMain = () => {
    const [gomoku, setGomoku] = useState(new Gomoku())
    const [clickAble, setClickAble] = useState(true)
    useEffect(() => {
        if (gomoku.isDraw()) {
            setGomoku(new Gomoku(gomoku.toBoardString()))
            const confirm = window.confirm("draw");
            if (confirm) {
                setGomoku(new Gomoku())
                return;
            }


        }
        if (gomoku.isWin()) {
            setGomoku(new Gomoku(gomoku.toBoardString()))
            const confirm = window.confirm("player " + gomoku.isWin() + " win");
            if (confirm) {
                setGomoku(new Gomoku())
                return;
            }
        }
        if (gomoku.turn() == 1) {
            console.log(gomoku.toBoardString());
            const move = minimax(gomoku.toBoardString(), 1, 9)
            console.log(move);
            const boardState = gomoku.move(parseInt(move / 3), move % 3)
            setGomoku(new Gomoku(boardState))
            setClickAble(true)
        }
    }, [gomoku])

    const onCellClick = (r, c) => {
        const move = gomoku.move(r, c);
        // console.log(move);

        if (move) {
            console.log(new Gomoku(move));
            setGomoku(new Gomoku(move))
            setClickAble(false);
        }
    }
    return (
        <div style={{
            margin: "48px",

        }}>
            <GomokuBoard
                position={gomoku.toBoardString()}
                size={gomoku.boardSize}
                onClick={clickAble ? onCellClick : () => { }}
            />
        </div>
    );
};

export default GomokuMain;