let board = [];
let food = [];
let snake = [];
let moveX = 1;
let moveY = 0;
let moveRight = true;
let moveLeft = false;
let moveUp = false;
let moveDown = false;
const height = 25;
const width = 80;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.snakeHead = false;
        this.food = false;
        this.snakeBody = false;
    }
}

function start() {
    initBoard();
    initSnake();
    initFood();
    printBoard();
    setInterval(play, 100);
}

function play() {
    updateSnake();
    updateBoard();
    printBoard();
}

function updateSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        board[snake[i].x][snake[i].y].snakeBody = false;
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    board[snake[0].x][snake[0].y].snakeHead = false;
    snake[0].x += moveX;
    snake[0].y += moveY;

    if (snake[0].x < 0) {
        snake[0].x = width;
    } else if (snake[0].x > width) {
        snake[0].x = 0;
    }

    if (snake[0].y < 0) {
        snake[0].y = height;
    } else if (snake[0].y > height) {
        snake[0].y = 0;
    }

    if (board[snake[0].x][snake[0].y].food) {
        updateFood();
        snake.push(new Cell(snake[snake.length - 1].x, snake[snake.length - 1].y));
    }
}

function updateFood() {
    let foodX = Math.floor(Math.random() * (width + 1));
    let foodY = Math.floor(Math.random() * (height + 1));

    while (true) {
        if (!board[foodX][foodY].snakeHead && !board[foodX][foodY].snakeBody && !board[foodX][foodY].food) {
            break;
        }

        foodX = Math.floor(Math.random() * (width + 1));
        foodY = Math.floor(Math.random() * (height + 1));
    }

    for (let i = 0; i < food.length; i++) {
        if (food[i].x === snake[0].x && food[i].y === snake[0].y) {
            board[food[i].x][food[i].y].food = false;
            food.splice(i, 1);
            break;
        }
    }

    food.push(new Cell(foodX, foodY));
}

function updateBoard() {
    if (snake.length == width * height) {
        alert("You win!");
        initBoard();
        initSnake();
        initFood();
        printBoard();
    }

    board[snake[0].x][snake[0].y].snakeHead = true;

    for (let i = snake.length - 1; i > 0; i--) {
        board[snake[i].x][snake[i].y].snakeBody = true;
    }

    for (let foodCell of food) {
        board[foodCell.x][foodCell.y].food = true;
    }

    if (board[snake[0].x][snake[0].y].snakeBody) {
        moveX = 1;
        moveY = 0;
        moveRight = true;
        moveLeft = false;
        moveUp = false;
        moveDown = false;
        initBoard();
        initSnake();
        initFood();
        printBoard();
    }
}

function initBoard() {
    board = Array.from(Array(width + 1), () => new Array(height + 1));

    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            board[i][j] = new Cell(i, j);
        }
    }
}

function initSnake() {
    snake = new Array();
    snake.push(new Cell(Math.ceil(width / 4), Math.ceil(height / 2)));
    snake.push(new Cell(snake[0].x - 1, snake[0].y));
    snake.push(new Cell(snake[0].x - 2, snake[0].y));
    snake.push(new Cell(snake[0].x - 3, snake[0].y));

    for (let snakeCell of snake) {
        board[snakeCell.x][snakeCell.y].snakeBody = true;
    }

    board[snake[0].x][snake[0].y].snakeHead = true;
    board[snake[0].x][snake[0].y].snakeBody = false;

    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 87 || event.keyCode == 38) {
            let x = 0;
            let y = -1;

            if (!moveDown) {
                moveY = -1;
                moveX = 0;
                moveRight = false;
                moveLeft = false;
                moveUp = true;
                moveDown = false;
            }
        }
        if (event.keyCode == 65 || event.keyCode == 37) {
            let x = -1;
            let y = 0;

            if (!moveRight) {
                moveY = 0;
                moveX = -1;
                moveRight = false;
                moveLeft = true;
                moveUp = false;
                moveDown = false;
            }
        }
        if (event.keyCode == 83 || event.keyCode == 40) {
            let x = 0;
            let y = 1;

            if (!moveUp) {
                moveY = 1;
                moveX = 0;
                moveRight = false;
                moveLeft = false;
                moveUp = false;
                moveDown = true;
            }
        }
        if (event.keyCode == 68 || event.keyCode == 39) {
            let x = 1;
            let y = 0;

            if (!moveLeft) {
                moveY = 0;
                moveX = 1;
                moveRight = true;
                moveLeft = false;
                moveUp = false;
                moveDown = false;
            }
        }
    })
}

function initFood() {
    food = new Array();

    food.push(new Cell(Math.ceil(width / 6) * 4, Math.ceil(height / 2)));
    food.push(new Cell(Math.ceil(width / 6) * 5, Math.ceil(height / 2) + 5));
    food.push(new Cell(Math.ceil(width / 6) * 5, Math.ceil(height / 2) - 5));

    board[food[0].x][food[0].y].food = true;
    board[food[1].x][food[1].y].food = true;
    board[food[2].x][food[2].y].food = true;
}

function printBoard() {
    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            let element = document.getElementById(i + "_" + j);

            element.style.backgroundColor = "#181818";

            if (board[i][j].snakeHead) {
                element.style.backgroundColor = "#1c5105";
            }
            if (board[i][j].snakeBody) {
                element.style.backgroundColor = "#35a306";
            }
            if (board[i][j].food) {
                element.style.backgroundColor = "#bf2c0f";
            }
        }
    }
}