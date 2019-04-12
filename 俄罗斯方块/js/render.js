import {
    LineNum,
    RowNum,
    Rect,
    Border
} from './staticValue.js'
class Render {
    constructor() {
        let canvasId = document.getElementById('canvas');
        this.canvasId = canvasId;
        canvasId.style.border = "1px solid #ccc";
        canvasId.height = LineNum * (Rect + Border);
        canvasId.width = RowNum * (Rect + Border);
        this.height = LineNum * (Rect + Border);
        this.width = RowNum * (Rect + Border);
        this.canvas = canvasId.getContext('2d');
    }
    fail() {
        let fail = setTimeout(function () {
            alert('你输啦');
            clearTimeout(fail);
        }, 200);
        document.querySelector('.box-layer').style.opacity = '0.7';
        document.querySelector('#restart').style.visibility = 'visible';
    }
    updateScore(score, level, callback) {
        if (score >= 80 * level) {
            document.querySelector('.nextLevel').style.opacity = '1';
            setTimeout(() => {
                document.querySelector('.nextLevel').style.opacity = '0';
                callback();
            }, 1000);
        }
        document.getElementById('score').innerText = score;
    }
    pause() {
        document.querySelector('.box-layer').style.opacity = '0.7';
        document.querySelector('#restart').style.visibility = 'visible';
        document.querySelector('#start').style.visibility = 'visible';
    }
    continue () {
        document.querySelector('.box-layer').style.opacity = '0';
        document.querySelector('#restart').style.visibility = 'hidden';
        let startId = document.querySelector('#start');
        startId.style.visibility = 'hidden';
        startId.innerText = "继续游戏";
    }
    // 移动到特定位置，画特定大小的正方形
    // x: x坐标，y: y坐标
    drawRectangle(x, y) {
        this.canvas.fillRect((x) * (Rect + Border), (y) * (Rect + Border), Rect, Rect);
    }
    // 渲染视图
    renderView(wall, brick) {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.moveTo(0, 0);
        this.canvas.fillStyle = "red";
        for (let i = 0; i < wall.view.length; i++) {
            for (let j = 0; j < wall.view[i].length; j++) {
                if (wall.view[i][j] === 1) {
                    // 注意x,y坐标对应的二维数组
                    this.drawRectangle(j, i);
                }
            }
        }
        for (let i = 0; i < brick.view.length; i++) {
            for (let j = 0; j < brick.view[i].length; j++) {
                if (brick.view[i][j] === 1) {
                    this.drawRectangle(j + brick.left, i + brick.top);
                }
            }
        }
    }
}
export default Render;