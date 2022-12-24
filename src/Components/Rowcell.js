import React, { useState } from 'react';
import Circle from './Circle';
import Promotion from './Promotion';
import Sparsable from './Sparsable';
const cellStyle = {
    width: "70px",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",



}
const Rowcell = ({ cell, dotted, sparsable }) => {



    return (
        <div style={cellStyle}>
            {
                ((dotted.includes(cell) && <Circle />) ||
                    (sparsable.includes(cell) && <Sparsable />))


            }
        </div>
    );
};

export default Rowcell;