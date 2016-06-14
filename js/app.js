//layed out grid to make code more readable
var canvasGrid = {
    xblock : 101,
    yblock : 83,
    //x coordinates
    x : [
        0,//0 
        101,//1 
        202,//2 
        303,//3
        404.//4
    ],
    //y coordinates
    y : [ 
        0,//0 
        68,//1
        151,//2
        234,//3
        317,//4
        400//5
    ]
}

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
    } 
    else if (this.x > canvasGrid.x[4]) {
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

// Place the Player object in a variable called Player
var Player = {
    //initial Player position
    x: canvasGrid.x[2],
    y: canvasGrid.y[5],

    //the reset function handles a 'menu screen' by states passed to it from elsewhere
    'reset' : function(state) {
        //this keeps the last state that was sent to the reset function or stores a new state
        if (state === undefined) {
            state = lastState;
        } else {
            lastState = state;
        }

        //shared variables for when the overlay is on
        var on = function() {
            //Transparency value
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = 'black';
            //fills the entire canvas
            ctx.fillRect(0, 48, 505, 550);

            ctx.globalAlpha = 1;
            ctx.font = '30px serif';
            ctx.fillStyle = 'white';
            ctx.fillText('press an arrow key to continue', 75, 550);
        };

        switch (state) {
            case 'gameStart':
                on();

                ctx.fillText('Good Luck', 185, 350);

                ctx.font = '55px serif';
                ctx.fillText('Welcome', 152, 300);
                break;
            case 'gameOver':
                on();

                ctx.font = '55px serif';
                ctx.fillText('Game Over', 125, 300);
                break;
            case 'gameWon':
                on();

                ctx.fillText('You Won', 195, 350);

                ctx.font = '55px serif';
                ctx.fillText('Congratulations', 75, 300);
                break;
            case 'gamePaused':
                on();

                ctx.font = '55px serif';
                ctx.fillText('Paused', 175, 300);
                break;
            case 'off':
                ctx.font = '20px serif';
                ctx.fillText('press escape to pause', 10, 100);
                break;
        }
    },

    'update': function() {
        //x bounds reset
        if (this.x < canvasGrid.x[0]) {
            this.x = canvasGrid.x[4];
        }
        else if (this.x > canvasGrid.x[4]) {
            this.x = canvasGrid.x[0];
        }
        //y bounds reset
        if (this.y <= canvasGrid.y[0]) {
            Player.reset('gameWon');
            this.y = canvasGrid.y[5];
            this.x = canvasGrid.x[2];
        } 
        else if (this.y > canvasGrid.y[5]) {
            this.y = canvasGrid.y[5];
        }
    },

    'render': function() {
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    },

    'handleInput': function(keyPress) {
        switch (keyPress) {
            case 'left':
                this.x -= canvasGrid.xblock;
                break;
            case 'up':
                this.y -= canvasGrid.yblock;
                break;
            case 'right':
                this.x += canvasGrid.xblock;
                break;
            case 'down':
                this.y += canvasGrid.yblock;
                break;
        }
    }
};

//handles the pause menu and turns off menus when an input is recieved
var resetInput = function(keyPress) {
    if (keyPress === 'escape') {
        Player.reset('gamePaused');
    } else if (keyPress !== undefined && keyPress !== 27) {
        Player.reset('off');
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'escape'
    };

    resetInput(allowedKeys[e.keyCode]);
    Player.handleInput(allowedKeys[e.keyCode]);
});