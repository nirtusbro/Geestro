var theGame = {};

theGame.Boot = function (game) {

};

theGame.Boot.prototype = {

    init: function () {


        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
           // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
           
        }
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
       // this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        //this.stage.disableVisibilityChange = true;
        
        //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
       // this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    },

    preload: function () {

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
