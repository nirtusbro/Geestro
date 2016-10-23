theGame.Preloader = function (game) {


};

theGame.Preloader.prototype = {

	preload: function () {

	
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

        

	
	    this.load.image('player', 'img/ginger.png');
	    this.load.image('enemy', 'img/rus.png');
	    this.load.image('bullet', 'img/metak5.png');
	    this.load.image('bckg', 'img/pozadina.png');
	    this.load.image('healthbar', 'img/healthBar.png');
		this.load.audio('bulletsound', 'sound/bambam.mp3');
	},

	create: function () {

		this.state.start('Game');

	}
    
   

};
