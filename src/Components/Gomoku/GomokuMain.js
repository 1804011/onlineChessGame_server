import React, { useEffect, useState } from 'react';
import Gomoku, { bestMoves } from './Gomoku';
import GomokuBoard from './GomokuBoard';

const GomokuMain = () => {
    const [gomoku, setGomoku] = useState(new Gomoku());
    const [special, setSpecial] = useState(gomoku.special);
    const [clickAble, setClickAble] = useState(false);
    useEffect(() => {
        if (gomoku.isWin()) {
            setSpecial([...gomoku.special]);
            alert('Player ' + gomoku.isWin() + " win");
            return;
        }
        else if (gomoku.isDraw()) {
            alert("Draw");
            return;
        }
        setTimeout(() => {
            if (gomoku.turn() === 0) {
                const { i, j } = bestMoves(gomoku.toBoardString(), 2, 1);
                setGomoku(new Gomoku(gomoku.move(i, j)))
                setClickAble(true);
            }
        }, [100])



    }, [gomoku])
    const onCellClick = (r, c) => {
        // alert(r, c);
        const result = gomoku.move(r, c);

        if (result) {
            setGomoku(new Gomoku(result))
            setClickAble(false);
        }

    }

    return (
        <div style={{ margin: "48px" }}>
            <GomokuBoard onClick={clickAble ? onCellClick : () => { }} position={gomoku.toBoardString()} special={special} />
        </div>
    );
};

export default GomokuMain;