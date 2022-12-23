const passwordInput = document.querySelector('[data-password]');
const repeatPasswordInput = document.querySelector('[data-repeat-password]');
const lengthInfo = document.querySelector('[data-length]');
const specialInfo = document.querySelector('[data-special]');
const capitalInfo = document.querySelector('[data-capital]');
const digitInfo = document.querySelector('[data-digit]');
const errorInfo = document.querySelector('[data-error]');
const passwordVisible = document.querySelector('[data-visible]');
const repeatPasswordVisible = document.querySelector('[data-repeat-visible]');

const switchClasses = (domElement, toRemove, toAdd) => { // element, class to remove, class to add
    domElement.classList.remove(toRemove);
    domElement.classList.add(toAdd);
}

const showPassword = (inputElement, iconElement) => {
    inputElement.type === 'password' ? inputElement.type = 'text' : inputElement.type = 'password';
    iconElement.innerHTML === 'visibility_off' ? iconElement.innerHTML = 'visibility' : iconElement.innerHTML = 'visibility_off';
}

const checkCondition = (value, regex, element) => {
    if (regex.test(value)) {
        switchClasses(element, 'wrong', 'good');
    }
    else {
        switchClasses(element, 'good', 'wrong');
    }
}

const compareInputValues = () => {
    if (passwordInput.value !== repeatPasswordInput.value) {
        errorInfo.style.display = 'block';
    }
    else {
        errorInfo.style.display = 'none';
    }
}

const checkStrength = (e) => {
    compareInputValues();
    checkCondition(e.target.value, /.{8,}/g, lengthInfo); // length
    checkCondition(e.target.value, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, specialInfo); // special charaxcters
    checkCondition(e.target.value, /[A-ZĄĘĆÓŃŻŹ]+/, capitalInfo); // capital characters
    checkCondition(e.target.value, /\d/g, digitInfo); // digits
}

passwordInput.addEventListener('input', checkStrength);
repeatPasswordInput.addEventListener('input', compareInputValues);
passwordVisible.addEventListener('click', () => showPassword(passwordInput, passwordVisible));
repeatPasswordVisible.addEventListener('click', () => showPassword(repeatPasswordInput, repeatPasswordVisible));
