cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
        // 暂存 Game 对象的引用
        game: {
            default: null,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },


    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.players[0].getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },

    // called every frame
    update: function (dt) {
        this.game.pickRadius = this.pickRadius;

        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = Math.max(1 - this.game.timer/this.game.starDuration, 0.01);
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
