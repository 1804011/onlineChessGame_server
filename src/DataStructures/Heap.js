class Heap {
    constructor(comp = (a, b) => a - b) {
        this.length = 0;
        this.elements = [];
        this.comp = comp;

    }
    push(x) {
        this.elements.push(x);
        let current = this.length;
        while (current > 0) {
            const parent = parseInt((current + 1) / 2) - 1;
            if (this.comp(this.elements[current], this.elements[parent]) > 0) {
                [this.elements[current], this.elements[parent]] = [this.elements[parent], this.elements[current]]
                current = parent;
            }
            else break;
        }

        this.length++;
    }
    top() { return this.elements[0] };
    pop() {
        if (this.length === 0) return null;
        const mx = this.top();
        this.elements[0] = this.elements[this.length - 1];
        this.elements.pop();
        let current = 0;
        while (1) {
            const idx1 = 2 * current + 1;
            const idx2 = 2 * current + 2;
            const child1 = this.elements[idx1];
            const child2 = this.elements[idx2];
            let x = this.elements[current];
            if (child1 && child2) {
                let idx = idx1;
                if (this.comp(child1, child2) < 0)
                    idx = idx2;
                if (this.comp(x, this.elements[idx]) < 0) {
                    [this.elements[current], this.elements[idx]] = [this.elements[idx], this.elements[current]]
                    current = idx;
                }
                else break;

            }
            else if (child1) {
                if (this.comp(x, child1) < 0) {

                    [this.elements[current], this.elements[idx1]] = [this.elements[idx1], this.elements[current]]
                    current = idx1;
                }
                else break;
            }
            else if (child2) {
                if (this.comp(x, child2) < 0) {
                    [this.elements[current], this.elements[idx2]] = [this.elements[idx2], this.elements[current]]
                    current = idx2;
                }
                else break;
            }
            else {
                break;
            }

        }


        this.length--;
        return mx;
    }



}
export default Heap;








