// Import 

import { apiKey } from "../JS/apiKey.js";

// Array Try 

const imageReferences = [
    document.getElementById("slide-1"),
    document.getElementById("slide-2"),
    document.getElementById("slide-3"),
    document.getElementById("slide-4"),
];

function searchGames() {
    const offset = Math.floor(Math.random() * 80000);
    return fetch(`https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&offset=${offset}&limit=1`)
    .then((res) => res.json())
    .then((json) => {
        const results = json.results;
        return results[0].image.original_url;
    })
    .catch((err) => console.log(err))
}

imageReferences.forEach(imageRef => {
    searchGames()
    .then(imageUrl => {
        imageRef.src = imageUrl;
    })
    .catch(err => console.log(err));
});
