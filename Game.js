
theGame.Game = function (game) {
    this.land;
    this.player;
    this.enemyT;
    this.enemies = [];
    //this.bullet;
    this.enemyBullets;
    this.healthbar;
    this.maxHealth;
    this.currentHealth;
    this.partitionHealth;
    this.hitCount;
    this.currentSpeed;
    this.cursors;
    this.bullets;
    this.fireRate;
    this.nextFire;
    this.point;
    this.bitmap;
    this.bmp;
};




Enemy = function (bullets, name, game) {
	
	this.health = 3;
    this.name = name;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
	this.isShooting = false;
	this.shot = false;
	this.player = game.add.sprite(game.world.randomX, 50, 'enemy'); //png
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.immovable = false;
    this.player.body.collideWorldBounds = true;
	this.player.body.enableBody = true;
	this.player.anchor.set(0.5, 0.5);
	this.player.body.bounce.setTo(1, 1);
	this.player.body.maxVelocity.setTo(330, 330);
	this.player.body.drag.setTo(400, 400);
	this.player.angle = game.rnd.angle();
    game.physics.arcade.velocityFromRotation(this.player.rotation, 100, this.player.body.velocity);
	this.player.body.setSize(68, 70, -8.5, 4); 

};




theGame.Game.prototype = {

    create: function () {

        this.maxHealth = 50;
        this.currentHealth = 50;
        this.hitCount = 0;
        this.currentSpeed = 0;
        this.fireRate = 150;
        this.nextFire = 2;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        // this.time.advancedTiming = true;
        this.world.setBounds(-1000, -1000, 2000, 2000);
        this.bitmap = this.add.bitmapData(this.width, this.height);
        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
        this.add.image(0, 0, this.bitmap);

        this.land = this.add.tileSprite(0, 0, 2000, 2000,  'bckg');
        //land.scale.setTo(0.8);
        this.land.fixedToCamera = true;

        this.player = this.add.sprite(0, 0, 'player');
        this.player.scale.setTo(0.8);
        this.player.anchor.setTo(0.34, 0.56);
        this.physics.arcade.enable(this.player);
        this.player.body.maxVelocity.setTo(330, 330);
        this.player.body.drag.setTo(2000, 2000);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(1, 1);
        this.player.body.setSize(68, 70, -8.5, 4);


        this.healthbar = this.add.sprite(415, 500, 'healthbar');
        this.healthbar.scale.setTo(0.5);
        this.healthbar.fixedToCamera = true;

        this.bmd = this.add.bitmapData(266, 55);


        //bmd = game.add.bitmapData(265, 40);	
        this.bmd.ctx.beginPath();
        this.bmd.ctx.rect(0, 0, 266, 52);
        this.bmd.ctx.fillStyle = '#66CC00';
        this.bmd.ctx.fill();

        this.widthLife = new Phaser.Rectangle(0, 0, this.bmd.width, this.bmd.height);
        this.totalLife = this.bmd.width;
   
        this.life = this.add.sprite(416, 529, this.bmd);
        this.life.anchor.y = 0.5;
        this.life.cropEnabled = true;
        this.life.crop(this.widthLife);
        this.life.fixedToCamera = true;
	
        this.bullets =  this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
        this.bullets.createMultiple(30, 'bullet', 0, false);

        this.bullets.setAll('anchor.x', 0.5);

        this.bullets.setAll('anchor.y', 0.5);

        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
	    
        this.enemyT= new Enemy(this.bullets, 'Baja', this);
//	    this.enemyT = this.add.sprite(this.world.randomX, 50, 'enemy'); //png
//	    this.enemyT.anchor.setTo(0.33, 0.55);
//        this.physics.enable(this.enemyT, Phaser.Physics.ARCADE);
//	    this.enemyT.body.immovable = false;
//	    this.enemyT.body.collideWorldBounds = true;
//	    //enemyT.body.enableBody=true;
//	    this.enemyT.scale.setTo(0.8);
//	
//
//        this.enemyT.body.bounce.setTo(1, 1);
//
//        this.enemyT.body.maxVelocity.setTo(330, 330);
//        this.enemyT.body.drag.setTo(400, 400);
//        this.enemyT.angle = this.rnd.angle();
//        this.enemyT.body.setSize(68, 70, -8.5, 4);

        this.point = new Phaser.Point(this.player.x, this.player.y);

        this.partitionHealth = this.widthLife.width / 5;
        this.healthbar.bringToTop();
        this.player.bringToTop();

        this.camera.follow(this.player);
        
    },
  
    
    fire: function () {

        if (this.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.time.now + this.fireRate;
            var bullet = this.bullets.getFirstExists(false);
            bullet.reset(this.point.x, this.point.y);

            bullet.rotation =  this.physics.arcade.angleToPointer(this.player);
            this.physics.arcade.velocityFromAngle(this.player.angle, 850, bullet.body.velocity);
        }
           
    },



    bulletHitEnemy: function (player, bullet) {
        bullet.kill();
        this.hitCount++;
        this.currentHealth--;
	
        if (this.widthLife.width <= 0) {
            this.widthLife.width = this.totalLife;
        } else {
            var tween = this.add.tween(this.widthLife).to({ width: (this.widthLife.width -  this.partitionHealth / 2) }, 50, Phaser.Easing.Linear.None, true);
        }


    },
   
 
    update: function () {

        this.physics.arcade.collide(this.player, this.enemyT.player);
        this.physics.arcade.collide(this.bullets, this.enemyT.player, this.bulletHitEnemy, null, this);
//		
//	for (var i = 0; i < enemies.length; i++)
//    {
//			
//				//enemiesAlive++;
//				game.physics.arcade.collide(player, enemies[i].player);
//				game.physics.arcade.overlap(bullets, enemies[i].player, bulletHitEnemy, null, this);
//				//enemies[i].update();
//			
//    }


	
	
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = 0;
	
        this.life.updateCrop();
    
      
           
        
	
	/*if (game.input.keyboard.isDown(Phaser.Keyboard.F))
    {
         hitCount++;
           stageGroup.scale.x = 0.5;   //easing
            stageGroup.scale.y = 0.5;
        	enemyT.body.setSize(34, 34, -4.5, 2);
        player.body.setSize(34, 34, -4.5, 2);
      
      // game.camera.focusOnXY(player.x, player.y);
    }
   
   if(game.input.keyboard.isDown(Phaser.Keyboard.G)){
        stageGroup.scale.x = 1;   //easing
            stageGroup.scale.y = 1;
   }*/
	  
	
        if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.player.body.acceleration.x = -5000;

        } else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.player.body.acceleration.x = 5000;
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.player.body.acceleration.y = -5000;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.player.body.acceleration.y = 5000;
        }

	

	
 
	
        this.land.tilePosition.x = -this.camera.x;
        this.land.tilePosition.y = -this.camera.y;

	    this.point.x = this.player.x;
	    this.point.y = this.player.y;
  
 // if(player.angle>0 && point.angle<0)hitcount++;
	    this.point.rotate(this.player.x, this.player.y, this.player.angle, true, 60);
	    this.player.rotation = this.physics.arcade.angleToPointer(this.player);
	

        if (this.input.activePointer.isDown) {
            this.fire();
        }

        
    },
    
     render: function()
    {
        //this.world.debug.text('hitCount:'+this.hitCount+'\n fps:'+this.time.fps || '--', 2, 14, "#00ff00");
        //this.debug.spriteInfo(this.player, 32, 32);
	    //game.debug.spriteInfo(point, 32, 32);
	    //this.debug.body(this.player);
	    //this.debug.body(this.enemyT.player);
    },
    
    quitGame: function () {

		this.state.start('Boot');

	}
    
    
   
};








