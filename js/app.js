// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //console.log(x, y);
    //console.log(Enemy.render);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (50 * dt);
    //x bounds reset
    if(this.x < 0) {this.x = 404}
    else if(this.x > 404) {this.x = 0}
    //console.log(this.x, this.y);
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.    }



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var bug1 = new Enemy(101, 68);
var bug2 = new Enemy(0, 151);
allEnemies.push(bug1, bug2);

// Place the player object in a variable called player
var player = {    
    //initial player position
    x : 202,
    y : 400,
    
    'update' : function () {
        //console.log(this.x, this.y);
        //x bounds reset
        if(this.x < 0) {this.x = 404}
        else if(this.x > 404) {this.x = 0}
        //y bounds reset
        if(this.y <= 0) {this.y = 400}
        else if(this.y > 400) {this.y = 400}
    },
    
    'render' : function () {
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    },
    
    'handleInput' : function (keyPress) {
        switch (keyPress) {
            case 'left' :
                console.log('I pressed the left key');
                this.x -= 101;
                break;
            case 'up' :
                console.log('I pressed the up key');
                this.y -= 83;
                break;
            case 'right' :
                console.log('I pressed the right key');
                this.x += 101;
                break;
            case 'down' :
                console.log('I pressed the down key');
                this.y += 83;
                break;
        }   
    }
};
