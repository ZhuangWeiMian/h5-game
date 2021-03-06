本文从面向对象的思路进行开发游戏
###一开始分析需求：
![image.png](https://upload-images.jianshu.io/upload_images/2986075-0af8b15c5509e33c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


分析完需求后，我们需要对问题进行细分
###问题拆分：

1、游戏分为界面和逻辑
2、逻辑中有墙、砖头、背景、操作行为者
3、界面通过编写一下需要编写一些基础的样式及变换

从面向对象来思考，可分为四个类： Wall、Brick、Background、Operate
既然有了对象，就会出现对象的行为，我们可以分析一下对象中各有什么行为。

###行为分析
Wall就是墙，墙有什么行为呢？让我们回顾需求
1、墙需要对砖头进行合并，合并到达底部的砖头
2、墙需要判断是否到达顶部，到达顶部则报错。、
3、当墙的某一行填满时，应消去这一行墙

砖头呢？
1、左移moveLeft、右移moveRight、加速下落moveBottom
2、判断左边界 isArrivedLeft和右边界 isArrivedRight和判断到达底端isArrivedBottom
3、变换形状，进行旋转 rotate

背景的作用
1、提供墙的大小 
2、产生砖头 produceBrick
（这里的对象在开发中被删除，墙的大小还有其他一些参数作为常量存储在staticValue.js中，可在此处进行修改）

Operate操作者
1、开始游戏
2、结束游戏
操作整个流程的主要角色，把各个对象组合起来一起使用

###解决问题：
遇到的第一个问题：
边界问题是主要问题，包括你在向左操作，向右操作，向下操作，还有旋转的时候都要进行判断。
因此我们可以把这些判断作为砖块本身的行为进行判断，执行行为之前，先进行判断。

解决办法：边界问题，我们通过遍历图形的二维数组的值，如果为砖块b[i][j] = 1则判断当前墙的位置w[i+i][j] 是否为1，为1 就停止，合并方块进入墙，产生新的方块。
向左向右边界的判断则是根据当前值是否为1，同时墙面[i][j+1]（右边界）、[i][j-1]（左边界）， 或者判断是否超出 j < 0 （左边界）、j > RowNum(一行中最多的小砖块个数)


遇到的第二个问题：
加速时，速度过大，直接跑到最大高度去？一加就超过了最大高度。上一秒还剩很多，下一秒就跑出边界

解决办法：出现这个的原因是因为前面的系统没有考虑清楚。在砖块做run行为的时候，渲染的频率是按时间划分的，比如说t = 1时 s = 1;t = 2 时 s = 3；这个过程只渲染两次，以时间作为维度，并且还会出现跳动的局面。重新设计系统是以距离为维度的，同样的就会有s =1, s = 2, s = 3的3个状态。

接下来是渲染问题：
我们需要监听页面中的事件，更新页面的一些dom行为我们放在一个文件里，这些在看代码的时候不会显得杂乱

出现问题：绑定一次多次触发
解决办法：通过给addEventlistener加多一个参数once: true解决


开发完成基本的逻辑之后，我们就可以考虑后续的细节逻辑问题了，包括： 计分，暂停，重新开始这些问题。（已完成）

然后这些问题开发完成之后，我们就可以考虑美观性，还有加奇奇怪怪新的需求的问题了~（待完成）