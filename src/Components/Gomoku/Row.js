import React from 'react';

const Row = ({ width, height, size, index, position, onClick }) => {

    const rowStyle = { width, height, display: "flex", }
    const cellStyle = {
        height: "100%",
        width: width / size,
        borderBottom: (index != size - 1) && "1px solid green",
        borderRight: "1px solid green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "200%"

    }
    const col = [];
    for (let i = 0; i < size; i++) {
        col.push(1);
    }
    return (
        <div style={rowStyle}>
            {
                col.map((val, idx) =>
                    <div
                        style={{
                            ...cellStyle,
                            borderRight: (idx != size - 1) && '1px solid green'
                        }
                        }
                        onClick={() => onClick(index, idx)}>
                        {
                            (position[index * size + idx] == '3' && 'X') || (
                                position[index * size + idx] == '2' && 'O'
                            )
                        }
                    </div>)
            }
        </div>
    );
};

export default Row;