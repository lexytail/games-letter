"use strict";
const random = (max) => (Math.random() * (max + 1)) | 0;
class Square {
    constructor($root, letter, size = 100) {
        this.$root = $root;
        this.letter = letter;
        this.size = size;
        this.$element = document.createElement('div');
        this.init();
    }
    init() {
        Object.assign(this.$element.style, {
            width: `${this.size}px`,
            height: `${this.size}px`,
            position: 'absolute',
            backgroundColor: '#f0ff0f',
            color: '#000',
            cursor: 'pointer',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        this.$element.innerHTML = this.letter;
        this.$root.appendChild(this.$element);
    }
    setPos(x, y) {
        this.$element.style.top = `${y}px`;
        this.$element.style.left = `${x}px`;
    }
}
class Game {
    constructor() {
        this.squares = [];
        this.square_size = 50;
        this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.$container = document.body;
        this.alphabet = 'qwertyuiopasdfghjklzxcvbnm';
    }
    get randomLetter() {
        const number = random(this.alphabet.length - 1);
        const letter = this.alphabet[number];
        return letter;
    }
    start() {
        this.timerId = setInterval(this.update.bind(this), 500);
        this.init();
    }
    init() {
        document.addEventListener('keypress', (event) => {
            if (event.defaultPrevented)
                return;
            const key = event.key || event.keyCode;
            const index = this.squares.findIndex((square) => square.letter === key);
            if (index === -1) {
                return;
            }
            const square = this.squares[index];
            this.$container.removeChild(square.$element);
            this.squares.splice(index, 1);
        });
    }
    stop() {
        clearTimeout(this.timerId);
    }
    update() {
        this.addSquare();
        if (this.squares.length > 10)
            return this.game_over();
    }
    game_over() {
        this.stop();
        alert('Game over');
    }
    addSquare() {
        const x = random(this.width - this.square_size * 2);
        const y = random(this.height - this.square_size * 2);
        const square = new Square(this.$container, this.randomLetter);
        square.setPos(x, y);
        this.squares.push(square);
    }
}
