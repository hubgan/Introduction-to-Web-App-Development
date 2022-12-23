const firstBox = document.querySelector('[data-first-box]');
const secondBox = document.querySelector('[data-second-box]');
const thirdBox = document.querySelector('[data-third-box]');
const propagationButton = document.querySelector('[data-propagation]');
const resetButton = document.querySelector('[data-reset]');
const bubblingButton = document.querySelector('[data-bubbling]');
const counterHTML = document.querySelector('[data-counter]');
const info = document.querySelector('[data-info]');

let isPropagation = false;
let isBubbling = false;
let counter = 0;

const switchPropagation = () => {
    isPropagation = !isPropagation;
    isPropagation ? propagationButton.innerHTML = 'Start Propagation' : propagationButton.innerHTML = 'Stop Propagation';
}

const updateCounter = () => {
    counterHTML.innerHTML = counter;
}

const updateInfo = (color, value) => {
    info.innerHTML = `Nacisnąłeś ${color} o wartości ${value}`;
}

const removeEventListeners = () => {
    firstBox.removeEventListener('click', clickFirstBox, { capture: isBubbling });
    firstBox.removeEventListener('click', clickFirstBox, { capture: !isBubbling });
    secondBox.removeEventListener('click', clickSecondBox, { capture: isBubbling });
    secondBox.removeEventListener('click', clickSecondBox, { capture: !isBubbling });
    thirdBox.removeEventListener('click', clickThirdBox, { capture: isBubbling });
    thirdBox.removeEventListener('click', clickThirdBox, { capture: !isBubbling });
}

const addEventListeners = () => {
    firstBox.addEventListener('click', clickFirstBox, { capture: isBubbling });

    if (counter < 30) secondBox.addEventListener('click', clickSecondBox, { capture: isBubbling });

    if (counter < 50) thirdBox.addEventListener('click', clickThirdBox, { capture: isBubbling });
}

const switchBubbling = () => {
    removeEventListeners();

    isBubbling = !isBubbling;

    addEventListeners();
}

const reset = () => {
    isPropagation = false;
    isBubbling = false;
    counter = 0;

    updateCounter();
    removeEventListeners();
    addEventListeners();
}

const checkCounterValue = () => {
    if (counter > 50) {
        thirdBox.removeEventListener('click', clickThirdBox, { capture: isBubbling });
        thirdBox.removeEventListener('click', clickThirdBox, { capture: !isBubbling });
    }
    else if (counter > 30) {
        secondBox.removeEventListener('click', clickSecondBox, { capture: isBubbling });
        secondBox.removeEventListener('click', clickSecondBox, { capture: !isBubbling });
    }
}

const clickFirstBox = (e) => {
    if (isPropagation) {
        e.stopPropagation();
    }

    counter += 5;
    updateCounter();
    checkCounterValue();
    updateInfo('niebieski', 5);
    console.log(counter);
}

const clickSecondBox = (e) => {
    if (isPropagation) {
        e.stopPropagation();
    }

    counter += 2;
    updateCounter();
    checkCounterValue();
    updateInfo('czerwony', 2);
    console.log(counter);
}

const clickThirdBox = (e) => {
    if (isPropagation) {
        e.stopPropagation();
    }

    counter += 1;
    updateCounter();
    checkCounterValue();
    updateInfo('żółty', 1);
    console.log(counter);
}

bubblingButton.addEventListener('click', switchBubbling);
firstBox.addEventListener('click', clickFirstBox, { capture: isBubbling });
secondBox.addEventListener('click', clickSecondBox, { capture: isBubbling });
thirdBox.addEventListener('click', clickThirdBox, { capture: isBubbling });
propagationButton.addEventListener('click', switchPropagation);
resetButton.addEventListener('click', reset);
