// Przykładowa lista ulubionych filmów (może być pobrana z backendu)
const favoriteMovies = [
    { title: "Film 1", description: "Opis filmu 1" },
    { title: "Film 2", description: "Opis filmu 2" },
    { title: "Film 3", description: "Opis filmu 3" },
    // Dodaj więcej filmów, jeśli potrzebujesz
];

// Funkcja do dynamicznego ładowania listy ulubionych filmów
// function loadFavoriteMovies() {
//     const favoriteMoviesSection = document.getElementById("favoriteMoviesSection");

//     favoriteMovies.forEach(movie => {
//         const movieElement = document.createElement("div");
//         movieElement.classList.add("favorite-movie");

//         const titleElement = document.createElement("h2");
//         titleElement.textContent = movie.title;

//         const descriptionElement = document.createElement("p");
//         descriptionElement.textContent = movie.description;

//         movieElement.appendChild(titleElement);
//         movieElement.appendChild(descriptionElement);

//         favoriteMoviesSection.appendChild(movieElement);
//     });
// }

// // Wywołaj funkcję ładowania listy ulubionych filmów przy załadowaniu strony
// window.onload = loadFavoriteMovies;
function read_movie_list() {
    var endpoint = "http://127.0.0.1:8000/movie/search";
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        // Po pobraniu danych, wywołaj funkcję do wyświetlania ulubionych filmów
        loadFavoriteMoviesFromFetch(data);
    })
    .catch((error) => {
        console.log(error);
    });
}

function loadFavoriteMoviesFromFetch(favoriteMovies) {
    const favoriteMoviesSection = document.getElementById("favoriteMoviesSection");

    favoriteMovies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("favorite-movie");

        const titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;

        const imgElement = document.createElement("img");
        imgElement.src = "../img/image.png";
        imgElement.alt = movie.title;


        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = movie.description;

        movieElement.appendChild(titleElement);
        movieElement.appendChild(imgElement);
        movieElement.appendChild(descriptionElement);

        favoriteMoviesSection.appendChild(movieElement);
    });
}


window.onload = function() {
    read_movie_list();
};