const test = document.querySelector('.test');
const addButton = document.querySelector('.add');
const removeButton = document.querySelector('.remove');
const paragraph = document.querySelector('p');

let counter = 0
let isActive = false;

const increament = () => {
    counter += 1;
    paragraph.innerText = `licznik ma wartosc: ${counter}`;
}

addButton.addEventListener('click', () => {
    if (isActive) return;

    isActive = true;
    test.addEventListener('click', increament);
    paragraph.innerText = 'test włączony';
})

removeButton.addEventListener('click', () => {
    if (!isActive) return;

    isActive = false;
    counter = 0;
    test.removeEventListener('click', increament);
    paragraph.innerText = 'test wyłączony';
})