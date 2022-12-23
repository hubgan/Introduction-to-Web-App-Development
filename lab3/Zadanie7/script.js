const buttonA = document.querySelector('[data-zada]');
const buttonB = document.querySelector('[data-zadb]');
const buttonC = document.querySelector('[data-zadc]');
const buttonD = document.querySelector('[data-zadd]');
const buttonE = document.querySelector('[data-zade]');
const buttonF = document.querySelector('[data-zadf]');
const buttonG = document.querySelector('[data-zadg]');
const info = document.querySelector('[data-display-info]');

const cities = [];

const displayData = (data) => {
    data.forEach(city => {
        const element = document.createElement('div');
        element.classList.add('city');
        element.innerHTML =
            `
                <p>Name: ${city.name}</p>
                <p>People: ${city.people}</p>
                <p>Area: ${city.area}</p>
                <p>Dentensity: ${city.dentensity}</p>
                <p>Province: ${city.province}</p>
                <p>City: ${city.township}</p>
            `;
        info.appendChild(element);
    })
}

const zadA = () => {
    info.innerHTML = '';
    const data = cities.filter(city => city.province === 'małopolskie');
    displayData(data);
}

const zadB = () => {
    info.innerHTML = '';

    const data = cities.filter(city => {
        const num = city.name.split('').reduce((acc, letter) => {
            if (letter === 'a' || letter === 'A') {
                return acc + 1;
            }

            return acc;
        }, 0)

        return num === 2 ? true : false;
    })

    displayData(data);
}

const zadC = () => {
    info.innerHTML = '';

    const data = [...cities];
    data.sort((a, b) => b.dentensity - a.dentensity);
    displayData([data[4]]);
}

const zadD = () => {
    info.innerHTML = '';

    const data = cities.map(city => {
        if (city.people > 100000) {
            return { ...city, name: `${city.name} City` };
        }

        return { ...city };
    })
    data.sort((a, b) => b.people - a.people);
    displayData(data);
}

const zadE = () => {
    info.innerHTML = '';

    const [above, below] = cities.reduce((acc, city) => {
        if (city.people > 80000) {
            return [acc[0] + 1, acc[1]];
        }

        return [acc[0], acc[1] + 1];
    }, [0, 0]); // [Wiecej niz 80000, Mniej niz 80000]
    
    info.innerHTML = `Więcej jest miast ${above > below ? 'powyżej' : 'poniżej'} 80000 mieszakncow. Powyzej 80000 jest: ${above}. Ponizej 80000 jest: ${below}`;
}

const zadF = () => {
    info.innerHTML = '';

    const [sum, numberOfProvinces] = cities.reduce((acc, city) => {
        if (city.township[0] === 'P' || city.township[0] === 'p') {
            return [acc[0] + city.area, acc[1] + 1];
        }

        return acc;
    }, [0, 0])

    info.innerHTML = `Średnia powierzchnia powiatów na literę P wynosi ${sum / numberOfProvinces}`;
}

const zadG = () => {
    info.innerHTML = '';
    
    const data = cities.filter(city => city.province === 'pomorskie');

    let counter = 0;
    data.forEach((city) => {
        if (city.people > 5000) {
            counter += 1;
        }
    });

    const isEvery = data.every(city => city.people > 5000);
    info.innerHTML = `${isEvery ? 'Wszystkie' : 'Nie wszystkie'} miasta z województwa pomorskiego mają powyżej 5000 mieszkańców. Takich miast jest: ${counter}`;
}

const addEventListeners = () => {
    buttonA.addEventListener('click', zadA);
    buttonB.addEventListener('click', zadB);
    buttonC.addEventListener('click', zadC);
    buttonD.addEventListener('click', zadD);
    buttonE.addEventListener('click', zadE);
    buttonF.addEventListener('click', zadF);
    buttonG.addEventListener('click', zadG);
}

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/cities');
        const data = await response.json();
        
        data.forEach(city => cities.push(city));
    } catch (err) {
        document.querySelector('.error').style.display = 'block';
        console.log(err.message);
    }

    addEventListeners();
}

fetchData();