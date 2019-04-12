import {
    LineNum,
    RowNum,
    baseScore
} from './staticValue.js';
class Wall {

    constructor() {
        this.completeLine = new Array(RowNum).fill('1').toString();
        this.view = [];
        // 初始化墙面的视图大小
        for (let i = 0; i < LineNum; i++) {
            let item = new Array(RowNum);
            item.fill(0);
            this.view.push(item);
        }
    }
    isArrivedTop() {
        for (let i = 0; i < this.view[0].length; i++) {
            if (this.view[0][i]) return true;
        }
    }
    // 当砖块下落到底端时进行合并，成为墙的一部分
    mergeBrick(block) {
        let x = block.left;
        let y = block.top;
        for (let i = 0; i < block.view.length; i++) {
            for (let j = 0; j < block.view[i].length; j++) {

                if (i + y < LineNum && block.view[i][j]) {
                    this.view[y + i][j + x] = 1;
                }
            }
        }
        return this.judgeLine();
    }
    // 当墙的一行中全部被1填满，则删除该行数据
    clearLine(n) {
        this.view.splice(n, 1);
        let item = new Array(RowNum).fill(0);
        this.view.unshift(item);
    }
    // 判断该行是否全部为1
    judgeLine() {
        let score = 0;
        for (let i = 0; i < this.view.length; i++) {
            if (this.view[i].toString() === this.completeLine) {
                this.clearLine(+i);
                score += baseScore;
            };
            continue;
        }
        return score;
    }
}
export default Wall;