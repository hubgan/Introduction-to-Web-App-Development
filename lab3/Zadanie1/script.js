const button = document.querySelector('button');
const section = document.querySelector('.section');

button.addEventListener('click', () => {
    const name = prompt("Enter your name: ");
    const paragraph = document.createElement('p');
    paragraph.innerHTML = name;
    section.innerHTML =
        `
            Witamy ${name[name.length - 1] === 'a' ? 'Panią' : 'Pana'}: ${name}
        `;
})