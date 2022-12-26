import React, { useEffect, useState } from 'react';
import Gomoku from './Gomoku';
import GomokuBoard from './GomokuBoard';

const GomokuMain = () => {
    const [gomoku, setGomoku] = useState(new Gomoku());
    const [special, setSpecial] = useState(gomoku.special);
    useEffect(() => {
        if (gomoku.isWin()) {
            setSpecial([...gomoku.special]);
        }
        else if (gomoku.isDraw()) {
            alert("Draw")
        }

    }, [gomoku])
    const onCellClick = (r, c) => {

        const result = gomoku.move(r, c);

        if (result) {
            setGomoku(new Gomoku(result))
        }

    }
    console.log(gomoku.special);
    return (
        <div style={{ margin: "48px" }}>
            <GomokuBoard onClick={onCellClick} position={gomoku.toBoardString()} special={special} />
        </div>
    );
};

export default GomokuMain;