import React from 'react';
const containerStyle = {
    width: "70px",
    height: "285px",
    boxShadow: "8px 8px 8px rgba(0,0,0,0.15)",
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "row",
    borderRadius: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "orange",
    zIndex: 8


}
const uniCode = {
    fontSize: "48px",
    displey: "flex",
    justifyContent: "center",
    width: "70px",
    height: "70px",
    alignItems: "center",
    border: "1px solid green"
}

const Promotion = ({ setPromoted, setDisplayPromotion, color = 'w' }) => {
    return (
        <div style={containerStyle}>
            {
                color == 'w' ?
                    <>
                        <div style={uniCode} onClick={() => { setPromoted('q'); setDisplayPromotion(false) }}>
                            {'\u2655'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('r'); setDisplayPromotion(false) }}>
                            {'\u2656'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('b'); setDisplayPromotion(false) }}>
                            {'\u2657'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('n'); setDisplayPromotion(false) }}>
                            {'\u2658'}
                        </div>


                    </> :
                    <>
                        <div style={uniCode} onClick={() => { setPromoted('q'); setDisplayPromotion(false) }}>
                            {'\u265B'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('r'); setDisplayPromotion(false) }}>
                            {'\u265C'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('b'); setDisplayPromotion(false) }}>
                            {'\u265D'}
                        </div>
                        <div style={uniCode} onClick={() => { setPromoted('n'); setDisplayPromotion(false) }}>
                            {'\u265E'}
                        </div>


                    </>
            }
        </div>
    );
};

export default Promotion;