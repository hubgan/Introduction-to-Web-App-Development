const box = document.querySelector('[data-box]');
const circle = document.querySelector('[data-circle]');
const info = document.querySelector('[data-click-wrong]');

const onClick = (e) => {
    const boxDOMRect = box.getBoundingClientRect();

    if (!(e.pageY > boxDOMRect.top && e.pageY < boxDOMRect.bottom && e.pageX > boxDOMRect.left && e.pageX < boxDOMRect.right)) {
        info.style.top = `${e.pageY}px`;
        info.style.left = `${e.pageX}px`;
        info.style.display = 'block';                         
        return;
    }

    info.style.display = 'none'; 
    circle.style.top = `${e.pageY - boxDOMRect.top - circle.offsetHeight / 2}px`;
    circle.style.left = `${e.pageX - boxDOMRect.left - circle.offsetWidth / 2}px`;
}

window.addEventListener('click', onClick);