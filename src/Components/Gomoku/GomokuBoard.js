import React from 'react';
import Row from './Row';

const GomokuBoard = ({ size = 3,
    width = 210,
    height = 210,
    position = "111111111",
    onClick }) => {
    const boardStyle = {
        width,
        height,
        boxSizing: "border-box"
    }
    const boardPosition = position.substring(0, Math.min(49, size * size));
    const row = [];

    for (let i = 0; i < size; i++) {
        row.push(1)

    }
    return (
        <div style={boardStyle}>
            {
                row.map((val, index) =>
                    <Row
                        size={size}
                        width={width}
                        index={index}
                        height={height / size}
                        onClick={onClick}
                        position={boardPosition} />
                )
            }
        </div>
    );
};

export default GomokuBoard;