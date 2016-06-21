//layed out grid to make code more readable
var canvasGrid = {
    xblock: 101,
    yblock: 83,
    //x coordinates
    x: [
        0, //0 
        101, //1 
        202, //2 
        303, //3
        404 //4
    ],
    //y coordinates
    y: [
        0, //0 
        68, //1
        151, //2
        234, //3
        317, //4
        400 //5
    ]
};

// Enemies our Player must avoid
var Enemy = function(x, y, velocity) {
    //shared variables for all enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.velocity = velocity;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.velocity * dt);


    //x bounds reset
    if (this.x < canvasGrid.x[0]) {
        this.x = canvasGrid.x[4];
    } else if (this.x > canvasGrid.x[4]) {
        this.x = canvasGrid.x[0];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// all enemy objects in an array called allEnemies
var allEnemies = [];

var bug1 = new Enemy(canvasGrid.x[1], canvasGrid.y[1], 70);
var bug2 = new Enemy(canvasGrid.x[4], canvasGrid.y[2], -75);
allEnemies.push(bug1, bug2);

//used in the player.reset function
var lastState = undefined;

var Player = function(initialX, initalY, sprite) {
    this.x = initialX;
    this.y = initalY;
    this.sprite = sprite;

    this.initialX = initialX;
    this.initialY = initalY;
}

Player.prototype.update = function() {
    //x bounds reset
    if (this.x < canvasGrid.x[0]) {
        this.x = canvasGrid.x[4];
    } else if (this.x > canvasGrid.x[4]) {
        this.x = canvasGrid.x[0];
    }
    //y bounds reset
    if (this.y <= canvasGrid.y[0]) {
        allPlayers.forEach(function(player) {
            player.y = player.initialY;
            player.x = player.initialX;
        });
    } else if (this.y > canvasGrid.y[5]) {
        this.y = canvasGrid.y[5];
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress, index) {
    if(index === 0) {
        switch (keyPress) {
                case 'leftOne':
                    this.x -= canvasGrid.xblock;
                    break;
                case 'upOne':
                    this.y -= canvasGrid.yblock;
                    break;
                case 'rightOne':
                    this.x += canvasGrid.xblock;
                    break;
                case 'downOne':
                    this.y += canvasGrid.yblock;
                    break;
            }
    }
    else if(index === 1) {
        switch (keyPress) {
                case 'leftTwo':
                    this.x -= canvasGrid.xblock;
                    break;
                case 'upTwo':
                    this.y -= canvasGrid.yblock;
                    break;
                case 'rightTwo':
                    this.x += canvasGrid.xblock;
                    break;
                case 'downTwo':
                    this.y += canvasGrid.yblock;
                    break;
            }
    }
}

//array of players
allPlayers = [];

//determines the number of players to push to allPlayers based on user input
var playerSet = function(keyPress) {
    if(allPlayers.length === 0) {
        if(keyPress === 'one') {
            var player1 = new Player(canvasGrid.x[2], canvasGrid.y[5], 'images/char-boy.png');

            allPlayers.push(player1);
        }

        else if(keyPress === 'two') {
            var player1 = new Player(canvasGrid.x[3], canvasGrid.y[5], 'images/char-boy.png');
            var player2 = new Player(canvasGrid.x[1], canvasGrid.y[5], 'images/char-cat-girl.png');

            allPlayers.push(player1, player2);
        }
    }
}