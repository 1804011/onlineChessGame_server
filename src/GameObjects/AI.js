

const getBaseLog = (x, y) => {
    return parseInt(Math.log(y) / Math.log(x));
}
const func = (board) => {
    let size = parseInt(Math.sqrt(board.length))
    const row = [];
    const col = [];
    for (let i = 0; i < size; i++) {
        row.push(1);
        col.push(1);
    }
    const diagonal = [1, 1];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let idx = i * size + j;
            let val = parseInt(board[idx]);
            row[i] *= val;
            col[j] *= val;
            if (i === j) diagonal[0] *= val;
            if (i + j === size - 1) diagonal[1] *= val;

        }
    }
    return [row, col, diagonal]
}
const factor = (val, size) => {

    if (val % 6 == 0) return 0;
    let profit1 = getBaseLog(3, val);
    let profit2 = getBaseLog(2, val);
    if (val % 3 == 0) {
        return parseInt((profit1 * 40320) / size);
    }
    if (val % 2 == 0) {
        return parseInt((-profit2 * 40320) / size);
    }

    return 0;

}
const isWin = (board) => {
    const size = parseInt(Math.sqrt(board.length));
    // console.log(size);
    const [row, col, diagonal] = func(board);
    const first = parseInt(Math.pow(3, size));
    const second = parseInt(Math.pow(2, size));
    if (row.includes(first) || col.includes(first) || diagonal.includes(first))
        return 1;
    if (row.includes(second) || col.includes(second) || diagonal.includes(second))
        return 2;
    return 0;
}
const isDraw = (board) => {
    if (isWin(board)) return 0;
    const size = parseInt(Math.sqrt(board.length));
    for (let i = 0; i < size * size; i++) {
        if (board[i] == '1') { return 0; }
    }
    return 1;
}
const evaluate = (board) => {

    if (isWin(board) === 1)
        return 40320;
    if (isWin(board) === 2)
        return -40320;
    if (isDraw(board))
        return 0;
    const [row, col, diagonal] = func(board);
    const size = parseInt(Math.sqrt(board.length))
    let weight = 0;
    for (let i = 0; i < size; i++) {
        weight += factor(1 * row[i], size);
        weight += factor(1 * col[i], size)
    }
    for (let i = 0; i < 2; i++) {
        let val = 1 * diagonal[i];
        weight += factor(val, size);
    }
    return weight;

}
const turn = (board) => {
    const size = parseInt(Math.sqrt(board.length));
    let count = 0;
    for (let i = 0; i < size * size; i++) {
        if (board[i] == '1') count++;

    }
    if (size % 2 == 1) {
        return count % 2;
    }
    else {
        return 1 - (count % 2);
    }

}
const move = (board, idx) => {

    if (board[idx] != '1') return null;
    else {
        const newBoard = [...board];
        if (turn(board) == 1)
            newBoard[idx] = '3';
        else newBoard[idx] = '2'
        return newBoard.toString().split(',').join('');
    }

}
let bestMoves = null;
const minimax = (board, isMaximise, depth, first = 1) => {
    if (isDraw(board) || isWin(board))
        return evaluate(board)
    if (depth == 0) return evaluate(board)

    let mn = 40320, mx = -40320;
    const size = board.length;
    for (let i = 0; i < size; i++) {
        const result = move(board, i);
        if (result != null) {
            let way = minimax(result, 1 - isMaximise, depth - 1, 0);
            if (first && way > mx) {
                bestMoves = i;
            }
            mn = Math.min(way, mn);
            mx = Math.max(way, mx);
        }
    }
    if (first) return bestMoves;
    if (isMaximise) return mx;
    return mn;
}

const alphaBeta = (board, isMaximise, depth, alpha = -Infinity, beta = Infinity, first = 1) => {
    if (isWin(board) || isDraw(board))
        return evaluate(board)
    if (depth == 0) return evaluate(board)
    const size = board.length;
    if (isMaximise) {
        let profit = -Infinity;
        for (let i = 0; i < size; i++) {
            const result = move(board, i);
            if (result != null) {
                const way = alphaBeta(result, 1 - isMaximise, depth - 1, alpha, beta, 0);
                if (way > profit) {
                    profit = way;
                    bestMoves = i;
                }
                alpha = Math.max(alpha, profit);
                if (beta <= alpha)
                    break;
            }
        }
        if (first == 1) return bestMoves;
        return profit;

    }
    else {
        let profit = Infinity;
        for (let i = 0; i < size; i++) {
            const result = move(board, i);
            if (result != null) {
                const way = alphaBeta(result, 1 - isMaximise, depth - 1, alpha, beta, 0);
                if (way < profit) {
                    profit = way;

                }
                beta = Math.min(beta, profit);
                if (beta <= alpha)
                    break;
            }
        }
        return profit;
    }



}
// console.log(minimax('321111111', 1, 9));
export default alphaBeta;


