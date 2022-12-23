import { Zombie } from './Zombie.js';
import { Crosshair } from './Crosshair.js'
import { HighScore } from './HighScore.js';

class Game {
    #domElements = {
        container: document.querySelector('[data-container]'),
        score: document.querySelector('[data-score]'),
        lives: document.querySelector('[data-lives]'),
        modal: document.querySelector('[data-modal]'),
        nickInput: document.querySelector('[data-nickname]'),
        startGameButton: document.querySelector('[data-start]'),
        name: document.querySelector('[data-name]'),
        highscore: document.querySelector('[data-high-score]'),
        restartGame: document.querySelector('[data-restart]'),
        scoresContainer: document.querySelector('[data-scores]')
    }

    #nickName = null;
    #lives = null;
    #score = null;
    #zombies = [];
    #baseZombieInterval = null;
    #createZombieInterval = null;
    #checkPositionInterval = null;
    #zombieHeight = null;
    #crosshair = null;
    #pointsForHit = null;
    #pointsForMiss = null;

    init() {
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.#domElements.startGameButton.addEventListener('click', () => this.#getNickName());
        this.#domElements.restartGame.addEventListener('click', () => this.#restartGame());
    }

    #getNickName() {
        if (this.#domElements.nickInput.value.length > 0) {
            this.#newGame(this.#domElements.nickInput.value);
        }

        this.#domElements.nickInput.value = '';
    }

    #restartGame() {
        this.#domElements.highscore.classList.add('hide');
        this.#domElements.modal.classList.remove('hide');
    }

    #newGame(name) {
        this.#nickName = name;
        this.#setUserName();
        this.#lives = 3;
        this.#score = 0;
        this.#updateScoreText();
        this.#updateLivesText();
        this.#pointsForHit = 12;
        this.#pointsForMiss = -6;   
        this.#zombieHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--zombie-height'), 10);
        this.#baseZombieInterval = 10;
        this.#createZombieInterval = setInterval(() => this.#createRandomZombie(), 150);
        this.#checkPositionInterval = setInterval(() => this.#checkZombiePosition(), 1);
        this.#createCrosshair();
        this.#domElements.modal.classList.add('hide');
    }

    #setUserName() {
        this.#domElements.name.innerText = this.#nickName;
    }

    #createCrosshair() {
        this.#crosshair = new Crosshair(this.#domElements.container);
        this.#crosshair.init();
        this.#crosshair.element.addEventListener('click', (e) => this.#shoot(e));
    }

    #shoot(e) {
        let isAlreadyHit = false;

        this.#zombies.forEach((zombie, zombieIndex, zombiesArray) => {
            const zombiePosition = zombie.element.getBoundingClientRect();

            if (e.pageX > zombiePosition.left && e.pageX < zombiePosition.right && e.pageY > zombiePosition.top && e.pageY < zombiePosition.bottom && !isAlreadyHit) {
                zombiesArray.splice(zombieIndex, 1);
                this.#updateScore(this.#pointsForHit);
                zombie.remove();
                isAlreadyHit = true;
            }
        })
        
        if (!isAlreadyHit) {
            this.#updateScore(this.#pointsForMiss);
        }
    }

    #createRandomZombie() {
        const randomNumber = Math.floor(Math.random() * 2);

        if (randomNumber === 0) {
            this.#createZombie();
        }
    }

    #createZombie() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        const zombie = new Zombie(this.#domElements.container, this.#baseZombieInterval * randomNumber / 2, 'zombie', this.#zombieHeight);
        zombie.init();
        this.#zombies.unshift(zombie);
    }

    #updateScore(value) {
        this.#score += value;
        this.#updateScoreText();
    }

    #updateScoreText() {
        this.#domElements.score.textContent = `Score: ${this.#score}`;
    }

    #updateLives() {
        this.#lives -= 1;

        if (this.#lives === 0) {
            this.#endGame();
        }

        this.#updateLivesText();
    }

    #updateLivesText() {
        this.#domElements.lives.textContent = `Lives: ${this.#lives}`;
    }

    #checkZombiePosition() {
        this.#zombies.forEach((zombie, zombieIndex, zombiesArray) => {
            if (zombie.element.getBoundingClientRect().right < 0) {
                zombiesArray.splice(zombieIndex, 1);
                this.#updateLives();
                zombie.remove();
            }
        })
    }

    #endGame() {
        this.#zombies.forEach((zombie) => {
            zombie.element.remove();
        })
        this.#zombies = [];
        this.#crosshair.remove();
        this.#crosshair = null;
        
        clearInterval(this.#createZombieInterval);
        clearInterval(this.#checkPositionInterval);

        const highScore = new HighScore(this.#domElements.highscore, this.#domElements.scoresContainer, this.#nickName, this.#score);
        highScore.init();
    }
}


window.onload = () => {    
    const game = new Game();
    game.init();
}