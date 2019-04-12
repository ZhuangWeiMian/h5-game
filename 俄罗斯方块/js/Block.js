import { LineNum, RowNum,Matrix} from './staticValue.js';

class Block {
    constructor(speed = 1) {
        let typeLength = Matrix.length;
        this.item = Math.floor(Math.random() * typeLength);
        this.block = [];
        this.left = Math.floor(Math.random() * (RowNum - 3));
        this.top = -1;
        this.timespace = 1000;
        this.index = 0;
        this.init();
    }
    init() {
        this.view = Matrix[this.item][this.index % 4];
    }
    run() {
        this.top++;
        return this;
    }
    moveLeft(wall) {
        if (!this.isArrivedLeft(wall)) this.left--;
        return this;
    }
    moveRight(wall) {
        if (!this.isArrivedRight(wall)) this.left++;
        return this;
    }
    isArrivedLeft(wall) {
        for (let i = 0; i < this.view.length; i++) {
            for (let j = 0; j < this.view[i].length; j++) {
                if (this.view[i][j] && (this.left + j <= 0 || wall.view[i + this.top][j + +this.left - 1])) return true;
            }
        }
        return false;
    }
    isArrivedRight(wall) {
        for (let i = 0; i < this.view.length; i++) {
            for (let j = 0; j < this.view[i].length; j++) {
                if (this.view[i][j] && (this.left + j >= RowNum - 1 || wall.view[i + this.top][j + this.left + 1])) return true;
            }
        }
        return false;
    }
    isArrivedBottom(wall) {
        for (let i = 0; i < this.view.length; i++) {
            for (let j = 0; j < this.view[i].length; j++) {

                if (this.view[i][j] && (i + this.top + 1 >= LineNum || wall.view[i + this.top + 1][j + this.left])) return true;
            }
        }
        return false;
    }
    speedUp() {
        this.timespace = Math.max(this.timespace - 100, 300);
        return this;
    }
    rotate(wall, pace = 1) {
        // 旋转的时候也需要判断边界，不然可能转着就跑出去了
        this.index += pace;
        this.view = Matrix[this.item][this.index % 4];
        if (this.isArrivedLeft(wall)) this.left++;
        if (this.isArrivedRight(wall)) this.left--;
        if(this.isArrivedBottom(wall)) this.rotate(wall, -1);
        return this;
    }
}
export default Block;