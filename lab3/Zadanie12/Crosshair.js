export class Crosshair {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
    }

    init() {
        this.#setCrosshair();
    }

    #setCrosshair() {
        this.element.classList.add('crosshair');
        this.container.addEventListener('mousemove', (e) => this.#setPosition(e));
        this.container.appendChild(this.element);
    }

    #setPosition(e) {
        this.element.style.top = `${e.pageY}px`;
        this.element.style.left = `${e.pageX}px`;
    }

    remove() {
        this.element.remove();
    }
}