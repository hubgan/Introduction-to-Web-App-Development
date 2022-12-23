export class Zombie {
    constructor(container, intervalTime, zombieClass, zombieHeight) {
        this.container = container;
        this.zombieClass = zombieClass;
        this.intervalTime = intervalTime;
        this.zombieHeight = zombieHeight;
        this.element = document.createElement('div');
        this.interval = null;
    }

    init() {
        this.#setZombie();
        this.#updatePosition();
    }

    #updatePosition() {
        this.interval = setInterval(() => this.#setNewPosition(), this.intervalTime);
    }

    #setNewPosition() {
        this.element.style.left = `${this.element.offsetLeft - 12}px`
    }

    #setZombie() {
        this.element.classList.add(this.zombieClass);
        this.element.style.left = `${window.innerWidth}px`;
        this.element.style.bottom = `-${Math.floor(Math.random() * this.zombieHeight / 2)}px`;
        this.element.style.transform = `scale(${Math.random() * (1.1 - 0.9) + 0.9})`;
        this.container.appendChild(this.element);
    }

    remove() {
        clearInterval(this.interval);
        this.element.remove();
    }
}