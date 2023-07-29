// Imports 

import { setDarkMode, setLightMode, setTheme } from "../JS/theme.js";
import { apiKey } from "../JS/apiKey.js";
import { createAbout, createRelease, createSimilar, createReview } from "../JS/card.js";

// light and dark mode, load in dark mode by default, load in previously set mode if page is refreshed

export const themeButtons = document.querySelectorAll('.theme-button');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTheme();
    });
});

window.addEventListener('load', () => {
    let mode = sessionStorage.getItem('mode');
    if (mode === null) {
        mode = 'dark';
        setDarkMode();
    } else if (mode === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
});

// Game Search with API

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => searchGameName(searchInput.value));
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

export function searchGameName(input) {
    fetch(
        `https://www.giantbomb.com/api/search/?api_key=${apiKey}&query=${input}&format=json`
    )
        .then((res) => res.json())
        .then((data) => {
            const guid = data.results[0].guid;
            searchGameGUID(guid);
        })
        .catch((err) => console.log(err));
}

function searchGameGUID(GUID) {
    fetch(`https://www.giantbomb.com/api/game/${GUID}/?api_key=${apiKey}&format=json`)
    .then((res) => res.json())
    .then((data) => {
        createCards(data);
    })
    .catch((err) => console.log(err));
}

function createCards(data) {
    const results = data.results;
    console.log(results);
    createAbout(results);
    createRelease(results);
    createSimilar(results);
    createReview(results);
}
