const leftButton = document.querySelector('[data-left-button]');
const rightButton = document.querySelector('[data-right-button]');
const slides = document.querySelector('[data-slides]');
const randomQuotes = [...document.querySelectorAll('[data-random-quote]')];

const TRANSITION_DURATION = 0.4;
let isTransitioning = false;

let counter = 1;
const amountOfSlides = [...document.querySelectorAll('.slide')].length - 2;

const moveLeft = () => {
    if (counter <= 0 || isTransitioning) return;

    isTransitioning = true;
    setTransitionEffect(-1);

    // slides.style.transition = `${TRANSITION_DURATION}s`;
    // counter -= 1;
    // slides.style.transform = `translateX(${-100 * counter}%)`;
}

const moveRight = () => {
    if (counter > amountOfSlides || isTransitioning) return;
    
    isTransitioning = true;
    setTransitionEffect(1);

    // slides.style.transition = `${TRANSITION_DURATION}s`;
    // counter += 1;
    // slides.style.transform = `translateX(${-100 * counter}%)`;
}

const moveToRandomSlide = () => {
    if (isTransitioning) return;
    
    isTransitioning = true;
    let randomSlideNumber = counter;

    while (randomSlideNumber === counter) {
        randomSlideNumber = Math.floor(Math.random() * (amountOfSlides) + 1);
    }
    
    const slidesNumberDiff = randomSlideNumber - counter;

    setTransitionEffect(slidesNumberDiff, slidesNumberDiff);
    
    // slides.style.transition = `${TRANSITION_DURATION * Math.abs(slidesNumberDiff)}s`;
    // counter = randomSlideNumber;
    // slides.style.transform = `translateX(${-100 * counter}%)`;

    setTimeout(() => {
        isTransitioning = false;
    }, TRANSITION_DURATION * Math.abs(slidesNumberDiff) * 1000);
}

function setTransitionEffect(counterDiff, multiplier = 1) {
    slides.style.transition = `${TRANSITION_DURATION * Math.abs(multiplier)}s`;
    counter += counterDiff;
    slides.style.transform = `translateX(${-100 * counter}%)`;
}

const transitionEnd = () => {
    isTransitioning = false;
    slides.style.transition = 'none';

    if (counter == amountOfSlides + 1) {
        counter = 1;
    }
    else if (counter == 0) {
        counter = amountOfSlides;
    }

    slides.style.transform = `translateX(${-100 * counter}%)`;
}

leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);
randomQuotes.forEach((randomQuote) => {
    randomQuote.addEventListener('click', moveToRandomSlide);
})
slides.addEventListener('transitionend', transitionEnd);
