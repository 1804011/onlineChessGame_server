import React from 'react';
import Dot from './Dot';

const Row = ({ val, row, width, height, onClick, special }) => {
    const rowStyle = {
        width,
        height,
        display: "flex"
    }
    const cellStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid green",
        borderRight: "1px solid green",
        width: parseInt(width / 15),
        height


    }
    return (
        <div style={rowStyle}>
            {
                val?.map((value, col) =>
                    <div style={cellStyle} onClick={() => onClick(row, col)}>
                        {
                            (special.includes(15 * row + col) && <Dot color='firebrick' />)
                            ||
                            (value == 3 && <Dot />)
                            ||
                            (value == 2 && <Dot color='tomato' />)
                        }
                    </div>

                )
            }
        </div>
    );
};

export default Row;