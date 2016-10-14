/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var ledge;
var ground;
var hitPlatform;
var cursors;
var stars;
var score = 0;
var scoreText;



function preload() {
    
    game.load.image('mountain', 'assets/mountain.jpg');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    
}
//We're going to be using physics, so enable the Arcade Phsics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
function create() {
    game.add.sprite(0, 0, 'mountain');
    
    //The platforms group contains the ground and 2 ledges we can jump on \(^-^ )/
    platforms = game.add.group();
    //Will enable the physics for any object that is created in this group
    platforms.enableBody = true;
    //Here we can create the ground
    var ground = platforms.create(0,game.world.height - 64,'ground');
    //Scale it to fit the width of the game (the origional sprite is 400x32 in size)
    ground.scale.setTo(0.5, 2);
    //This stops it from falling away whenyou jump on it
    ground.body.immovable = true;
    var ground = platforms.create(0, game.world.height -64, 'ground');
    ground.scale.setTo(1, 2)
    ground.body.immovable = false;
    var ledge = platforms.create(35,200, 'ground');
    ledge.body.bounce.y =0.7 + Math.random() * 0.5;
    ledge.body.gravity.y = 6;
    
    var ledge = platforms.create(210,350, 'ground');
    ledge.body.immovable = true;
    
    var ledge = platforms.create(380,100, 'ground');
    ledge.body.immovable = true;
    //The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //We need to enable physics on the player
    game.physics.arcade.enable(player);
    
    //Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = .5;
    player.body.gravity.y = 10;
    player.body.collideWorldBounds = true;
    
    //Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();
    
    stars.enableBody = true;
    
    //Here we'll create 30 of the, evenly spaced apart
    for (var i = 0; i < 50; i++)
    {
    //Create a star inside of the 'stars' group
    var star = stars.create(i * 15.75, 0, 'star');
    
    //Let gravity do it's thing
    star.body.gravity.y = 6;
    
    // This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});
    
    
}

function update() {
    
    //Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    // Reset the players welocity (movement)
    player.body.velocity.x = 10;
    
    if (cursors.left.isDown)
    {
        // Move to the left
        player.body.velocity.x = -150;
        
        player.animations.play('left');
    } 
    else if (cursors.right.isDown)
    {
        //Move to the right
        player.body.velocity.x = 150;
        
        player.animations.play('right');
    }
    
    
    else
    {
        // Stand still
        player.animations.stop();
        
        player.frame = 4;
    }
    
    //Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    
    game.physics.arcade.collide(stars,platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
}

function collectStar (player, star) {
    //Removes the star from the screen
    star.kill();
    score+=1
    scoreText.text = "Score:" + score; + "score:"
    
}