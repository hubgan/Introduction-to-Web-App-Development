const regionsContainer = document.querySelector('[data-regions-container]');
const sortButtons = document.querySelectorAll('[data-sort-by]');
const showButtons = document.querySelectorAll('[data-show]');
const input = document.querySelector('[data-input]');

let data;
const regionsArr = [];
const regionsListElements = {};
const isReverse = {
    name: false,
    capital: false,
    population: false,
    area: false
};

let sortedRegionsListElements = {};

const HOW_MANY_LIST_ELEMENTS_VISIBLE = 5;
const actualListPosition = {};

const toggleVisiblity = (e) => {
    e.target.nextElementSibling.classList.toggle('hidden');
}

const sort_by = (field, reverse, primer) => {
    const key = field === 'name' ?
        function (x) {
            return x[field].common;
        } :
        primer ?
        function(x) {
            return primer(x[field]);
        } :
        function(x) {
            return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
};

const displayRegionsElements = (region, sortedRegionsListElements) => {
    const regionName = region.split(' ').join('').toLowerCase();
    const selector = `data-${regionName}`;
    const regionList = document.querySelector(`[${selector}]`);

    regionList.innerHTML = '';

    for (const [key, data] of Object.entries(sortedRegionsListElements)) {
        if (key === regionName) {
            data.forEach((object, index) => {
                const listElement = document.createElement('li');
                listElement.innerHTML =
                    `
                        <p>${object.name.common}</p>
                        <p>${object.capital ? object.capital[0] : `Brak informacji`}</p>
                        <p>${object.population}</p>
                        <p>${object.area}</p>
                    `;
                (index + 1) > actualListPosition[regionName] * HOW_MANY_LIST_ELEMENTS_VISIBLE - HOW_MANY_LIST_ELEMENTS_VISIBLE && (index + 1) <= actualListPosition[regionName] * HOW_MANY_LIST_ELEMENTS_VISIBLE ? undefined : listElement.classList.add("hidden");
                regionList.appendChild(listElement);
            });
        }
    };

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    buttonsContainer.innerHTML =
        `
            <button ${selector} data-prev>PREV</button>
            <button ${selector} data-next>NEXT</button>
        `;
    buttonsContainer.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', changePage);
    }) 

    regionList.appendChild(buttonsContainer);
}

const displayRegions = () => {
    regionsArr.forEach((region) => {
        const customSelector = region.split(' ').join('').toLowerCase();
        const domElement = document.createElement('div');
        domElement.classList.add('region');
        const regionData = data.filter((object) => {
            if (object.subregion === region) {
                return true;
            }

            return false;
        })
        domElement.innerHTML =
            `
                <p>
                    ${region}
                </p>
                <ul class="hidden" data-${customSelector}></ul>
            `;
        regionsContainer.appendChild(domElement);
        domElement.children[0].addEventListener('click', toggleVisiblity);
        createObject(regionsListElements, region, regionData);
        createObject(sortedRegionsListElements, region, regionData);
        createObject(actualListPosition, region, 1);
        displayRegionsElements(region, regionsListElements);
    })
}

const createObject = (object, key, value) => {
    object[key.split(' ').join('').toLowerCase()] = value;
}

const changePage = (e) => {
    const [region, direction] = Object.keys(e.target.dataset);
    diff = direction === 'next' ? 1 : -1;

    const listElements = filterObject(input.value, { ...sortedRegionsListElements });

    if (actualListPosition[region] * HOW_MANY_LIST_ELEMENTS_VISIBLE + HOW_MANY_LIST_ELEMENTS_VISIBLE >= listElements[region].length + HOW_MANY_LIST_ELEMENTS_VISIBLE && diff === 1) {
        return;
    }

    if (actualListPosition[region] * HOW_MANY_LIST_ELEMENTS_VISIBLE - HOW_MANY_LIST_ELEMENTS_VISIBLE < 1 && diff === -1) {
        return;
    }
    
    actualListPosition[region] += diff;
    
    sortTableWithInput(input);
}

const findRegions = () => {
    data.forEach((object) => {
        if (!regionsArr.includes(object.subregion) && object.subregion != undefined) {
            regionsArr.push(object.subregion);
        }
    })

    displayRegions();
}

const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const json = await response.json();
    data = json;

    findRegions();
}

const setActutalListPositions = () => {
    regionsArr.forEach((region) => {
        actualListPosition[region.split(' ').join('').toLowerCase()] = 1;
    })
}

const sortTableWithInputUtil = () => {
    setActutalListPositions();
    sortTableWithInput(input);
}

const filterObject = (value, objectToFilter) => {
    if (value !== '') {
        for (const [key, data] of Object.entries(objectToFilter)) {
            objectToFilter[key] = data.filter((element) => {
                return element.name.common.toLowerCase().includes(value) || String(element.capital).toLowerCase().includes(value) || element.population == value || element.area.value;
            })
        }
    }

    return objectToFilter;
}

const sortTableWithInput = (input) => {
    const value = input.value.toLowerCase();
    let objectToSort = { ...sortedRegionsListElements };

    filterObject(value, objectToSort)

    regionsArr.forEach((region) => {
        displayRegionsElements(region, objectToSort);
    })
}

const sortTableUtil = (e) => {
    const value = input.value.toLowerCase();
    let objectToSort = { ...sortedRegionsListElements };
    filterObject(value, objectToSort);

    sortTable(e, sortedRegionsListElements);
}

const sortTable = (e, objectToSort) => {
    const sortBy = e.target.dataset.sortBy;

    const reverseOption = isReverse[e.target.dataset.sortBy];

    for (const [key, data] of Object.entries(objectToSort)) {
        data.sort(sort_by(sortBy, reverseOption));
    }

    isReverse[e.target.dataset.sortBy] = !isReverse[e.target.dataset.sortBy];
    
    const objectToFilter = { ...objectToSort };
    filterObject(input.value, objectToFilter);
    
    regionsArr.forEach((region) => {
        displayRegionsElements(region, objectToFilter);
    })
}

sortButtons.forEach((sortButton)=> {
    sortButton.addEventListener('click', sortTableUtil);
})

input.addEventListener('input', () => sortTableWithInputUtil());

fetchData();
