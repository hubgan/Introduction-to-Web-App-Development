const addButton = document.querySelector('.add');
const removeButton = document.querySelector('.remove');
const list = document.querySelector('.list');

const listArr = [];

addButton.addEventListener('click', () => {
    const listElement = document.createElement('li');
    listElement.innerText = `item nr. ${listArr.length + 1}`;
    listArr.push(listElement);
    list.insertAdjacentElement("beforeend", listElement);
})

removeButton.addEventListener('click', () => {
    list.removeChild(list.firstElementChild);
    listArr.shift();
})