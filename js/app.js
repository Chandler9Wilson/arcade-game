// Enemies our player must avoid
var Enemy = function(x, y) {
    //shared variables for all enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (50 * dt);
    //x bounds reset
    if (this.x < 0) {
        this.x = 404;
    } else if (this.x > 404) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// all enemy objects in an array called allEnemies
var allEnemies = [];

var bug1 = new Enemy(101, 68);
var bug2 = new Enemy(0, 151);
allEnemies.push(bug1, bug2);

// Place the player object in a variable called player
var player = {
    //initial player position
    x: 202,
    y: 400,

    'update': function() {
        //x bounds reset
        if (this.x < 0) {
            this.x = 404;
        }
        else if (this.x > 404) {
            this.x = 0;
        }
        //y bounds reset
        if (this.y <= 0) {
            reset('gameWon');
            this.y = 400;
            this.x = 202;
        } 
        else if (this.y > 400) {
            this.y = 400;
        }
    },

    'render': function() {
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    },

    'handleInput': function(keyPress) {
        switch (keyPress) {
            case 'left':
                this.x -= 101;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'right':
                this.x += 101;
                break;
            case 'down':
                this.y += 83;
                break;
        }
    }
};

var lastState = undefined;

//the reset function handles a 'menu screen' by states passed to it from elsewhere
function reset(state) {
    //this keeps the last state that was sent to the reset function or stores a new state
    if (state === undefined) {
        state = lastState;
    } else {
        lastState = state;
    }

    //shared variables for when the overlay is on
    var on = function() {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = 'black';
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
}

//handles the pause menu and turns off menus when an input is recieved
var resetInput = function(keyPress) {
    if (keyPress === 'escape') {
        reset('gamePaused');
    } else if (keyPress !== undefined && keyPress !== 27) {
        reset('off');
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
    player.handleInput(allowedKeys[e.keyCode]);
});