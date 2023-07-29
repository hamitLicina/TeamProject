// Imports 

import { apiKey } from "../JS/apiKey.js";
import { searchGameName } from "../JS/main.js";

const similarContainer = document.getElementById("similar-container");
const reviewContainer = document.getElementById("review-container");
const releaseContainer = document.getElementById("release-container");
const aboutContainer = document.getElementById("about-container");
const searchInput = document.getElementById("search-input");

// Create cards for game search results 
// Each function will check for a value in the data object and and if it is undefined, it will display a message saying no data was found

export function createAbout(data) {
    aboutContainer.innerHTML = '';
    if (data.description == undefined) {
        const aboutP = document.createElement('p');
        aboutP.innerHTML = 'No Description Found';
        aboutContainer.appendChild(aboutP);
        return;
    }
    const aboutP = document.createElement('p');
    aboutP.innerHTML = data.description;
    aboutContainer.appendChild(aboutP);
}

export function createRelease(data) {
    releaseContainer.innerHTML = '';
    if (data.original_release_date == undefined) {
        const releaseP = document.createElement('p');
        releaseP.innerHTML = 'No Release Date Found';
        releaseContainer.appendChild(releaseP);
        return;
    }
    const releaseP = document.createElement('p');
    releaseP.innerHTML = `${data.name} waas originally released on ${data.original_release_date}`;
    releaseContainer.appendChild(releaseP);
}

export function createSimilar(data) {
    similarContainer.innerHTML = '';
    const newList = document.createElement('ul');
    if (data.similar_games.length === 0) {
        const similarLi = document.createElement('li');
        similarLi.innerHTML = 'No Similar Games Found';
        newList.appendChild(similarLi);
        return;
    }
    for (let i = 0; i < data.similar_games.length; i++) {
        const similarLi = document.createElement('li');
        similarLi.innerHTML = data.similar_games[i].name;
        similarLi.addEventListener('click', () => {
            window.scrollTo(0, 0);
            searchGameName(similarLi.innerHTML);
            searchInput.value = similarLi.innerHTML;
        });
        newList.appendChild(similarLi);
    }
    similarContainer.appendChild(newList);
}

export function createReview(data) {
    reviewContainer.innerHTML = '';
    console.log(data.reviews);
    if (data.reviews == undefined) {
        console.log('No Reviews Found, Sorry');
        const reviewP = document.createElement('p');
        reviewP.innerHTML = 'No review Found';
        reviewContainer.appendChild(reviewP);
        return;
    }
    const reviewURL = data.reviews[0].api_detail_url;
    fetch(`${reviewURL}?api_key=${apiKey}&format=json`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            reviewContainer.innerHTML = data.results.description;
        })
        .catch((err) => console.log(err));
}
