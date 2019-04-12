import Block from './Block.js'
import Wall from './Wall.js';
import Render from './render.js'
import {
    MinTimeSpace
} from './staticValue.js';
class Operate {
    constructor() {
        this.view = new Render();
        this.brick = new Block();;
        this.wall = new Wall();
        this.timeout = null; // 定时器，负责自动下落
        this.totalScore = 0;
        this.level = 1; // 关卡
        this.init();
    }

    init() {
        let startId = document.getElementById('start');
        startId.addEventListener('click', () => {
            this.view.continue();
            this.continue();
        }, {
            once: true
        });
        // 控制下左右空格操作
        let clickNum = 0; // 连续按两次↓会快速下落
        document.addEventListener('keyup', (e) => {
            if (this.timeout) {
                switch (e.keyCode) {
                    case 27:
                        {
                            this.pause();
                            break;
                        }
                    case 37:
                        {
                            this.brick.moveLeft(this.wall);
                            this.continue();
                            break;

                        }
                    case 39:
                        {
                            this.brick.moveRight(this.wall);
                            this.continue();
                            break;
                        }
                    case 40:
                        {
                            clickNum++;
                            if (clickNum > 1) {
                                this.brick.timespace = MinTimeSpace;
                                clickNum = 0;
                            } else {
                                this.brick.speedUp();
                            }
                            this.continue();
                            break;
                        }
                    case 32:
                        {
                            this.brick.rotate(this.wall);
                            this.continue();
                            break;
                        }

                    default:
                        break;
                }
            }

        })
    }
    restart() {
        this.wall = new Wall();
        this.brick = new Block();
        this.level = 1;
        this.totalScore = 0;
        this.continue();

    }
    pause() {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.view.pause();

        let startId = document.getElementById('start');
        startId.addEventListener('click', () => {
            this.view.continue();
            this.continue();
        }, {
            once: true // 防止绑定一次执行多次
        });

        let restartId = document.getElementById('restart');
        restartId.addEventListener('click', () => {
            this.view.continue();
            this.restart();
        })
    }
    continue () {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.view.renderView(this.wall, this.brick);
        if (this.brick.isArrivedBottom(this.wall)) {
            let score = this.wall.mergeBrick(this.brick);
            this.addScore(score);

            if (this.wall.isArrivedTop()) {
                this.fail();
                return;
            }

            this.brick = new Block();
        }
        this.timeout = setTimeout(() => {
            this.brick.run();
            this.continue();
        }, this.brick.timespace);
    }
    // 消去方块后得分
    addScore(score) {
        this.totalScore += score;
        // 更新分数，后判断是否超过当前关卡分数，超过则进入下一关
        this.view.updateScore(this.totalScore, this.level, () => {
            this.restart();
            this.level++;
            this.brick.timespace -= 200;
        });
    }
    fail() {
        this.view.fail();
        let restartId = document.getElementById('restart');
        restartId.addEventListener('click', () => {
            this.view.continue();
            this.restart();
        })
    }
}
export default new Operate();