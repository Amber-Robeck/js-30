const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray)
    const regex = new RegExp(this.value, 'gi');
    const html = matchArray.map(place => {
        const matchingCity = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const matchingState = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${matchingCity}, ${matchingState}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>   
        `;
    }).join('');
    suggestions.innerHTML = html;
};
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

//change only works when clicked off of input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// console.log(findMatches('Bos', cities));