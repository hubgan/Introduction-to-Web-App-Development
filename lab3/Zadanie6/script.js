const phonePositions = document.querySelector('[data-phone-positions]');
const nameInput = document.querySelector('[data-name]');
const phoneInput = document.querySelector('[data-phone]');
const addPosition = document.querySelector('[data-add]');

const phonePositionList = [];

const checkRegex = (value, regex) => {
    const match = value.match(regex) || [];
    return match.length > 0;
}

const removePhonePosition = (e) => {
    const target = e.target.parentNode.localName === 'button' ? e.target.parentNode.parentNode : e.target.parentNode;
    const index = phonePositionList.findIndex(element => element === target);
    phonePositionList.splice(index, 1);
    target.remove();
}

const createNewPhonePosition = (nameValue, phoneValue) => {
    const element = document.createElement('div');
    element.classList.add('phone-position');
    element.innerHTML = `
        <div class="info">
                <p class="bold">${nameValue}</p>
                <p>${phoneValue}</p>
            </div>
            <button data-remove class="remove">
                <img src="trash.svg" alt="remove icon">
            </button>
        </div>
    `
    element.querySelector('[data-remove]').addEventListener('click', removePhonePosition);
    phonePositionList.push(element);
    phonePositions.appendChild(element);
}

const onAddClick = (e) => {
    e.preventDefault();

    if (checkRegex(nameInput.value, /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/)) return; // Jesli zawiera znaki specjalne

    if (checkRegex(nameInput.value, /\d/g)) return; // Jesli zawiera liczby

    if (!checkRegex(nameInput.value, /^\p{Lu}?\p{Ll}*\s+\p{Lu}?\p{Ll}*(-\p{Lu})?\p{Ll}*$/u)) return; // Czy zawiera znaki nalezace do alfabetu

    const splitName = nameInput.value.split(/[ -]/);
    for (let i = 0; i < splitName.length; i++) {
        if (splitName[i][0].toUpperCase() !== splitName[i][0]) return;
    }

    const phoneWithoutWhiteSpace = phoneInput.value.replace(/\s/g, '')

    if (!checkRegex(phoneWithoutWhiteSpace, /\+?[\d ]{9,}/)) return;

    if (phoneWithoutWhiteSpace.length - phoneWithoutWhiteSpace.replace(/\+/g, '').length > 1) return;

    const phoneWithoutWhiteSpaceAndPlus = phoneWithoutWhiteSpace.replace(/\+/g, '');

    if (!(phoneWithoutWhiteSpaceAndPlus.length === 9 || phoneWithoutWhiteSpaceAndPlus.length === 12)) return;

    createNewPhonePosition(nameInput.value, phoneInput.value);
}

addPosition.addEventListener('click', onAddClick);
