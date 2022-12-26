class Gomoku {
    constructor(position = "") {
        this.boardState = [];
        this.count = 0;
        this.special = [];
        for (let i = 0; i < 15; i++) {
            let arr = [];
            for (let j = 0; j < 15; j++) {
                let char = parseInt(position[15 * i + j]);
                if (isNaN(char))
                    char = 1;
                else char = parseInt(position[15 * i + j]);
                if (char === 1) this.count++;
                arr.push(char);

            }
            this.boardState.push(arr);

        }


    }
    toBoardString() {
        return this.boardState.toString().split(',').join('');
    }
    turn() {
        return 1 - (this.count % 2)
    }
    valid(r, c) { return (r >= 0 && c >= 0 && r < 15 && c < 15) }
    isWin() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let mul1 = 1, mul2 = 1, mul3 = 1, mul4 = 1;
                let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
                for (let k = 0; k < 5; k++) {
                    if (this.valid(i, j + k)) {
                        mul1 *= this.boardState[i][j + k];
                        arr1.push(15 * i + j + k)
                    }
                    if (this.valid(i + k, j)) {
                        mul2 *= this.boardState[i + k][j];
                        arr2.push(15 * (i + k) + j)
                    }
                    if (this.valid(i + k, j + k)) {
                        mul3 *= this.boardState[i + k][j + k];
                        arr3.push(15 * (i + k) + j + k)
                    }
                    if (this.valid(i + k, j - k)) {
                        mul4 *= this.boardState[i + k][j - k];
                        arr4.push(15 * (i + k) + j - k)

                    }
                }

                if (mul1 === 243) {
                    this.special = [...arr1];
                    return 1;
                }
                if (mul2 === 243) {
                    this.special = [...arr2];
                    return 1;
                }
                if (mul3 === 243) {
                    this.special = [...arr3];
                    return 1;
                }
                if (mul4 === 243) {
                    this.special = [...arr4];
                    return 1;
                }
                if (mul1 === 32) {
                    this.special = [...arr1];
                    return 2;
                }
                if (mul2 === 32) {
                    this.special = [...arr2];
                    return 2;
                }
                if (mul3 === 32) {
                    this.special = [...arr3];
                    return 2;
                }
                if (mul4 === 32) {
                    this.special = [...arr4];
                    return 2;
                }
            }
        }
        return 0;
    }
    isDraw() {
        if (this.isWin()) return 0;
        return this.count === 0;
    }
    move(i, j) {
        if (this.isWin() || this.isDraw()) return null;
        if (this.boardState[i][j] !== 1) return null;

        const val = (this.turn() === 0 ? 3 : 2);
        this.boardState[i][j] = val;
        this.count--;
        return this.toBoardString();


    }

}

export default Gomoku;