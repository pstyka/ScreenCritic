function goToHomePage() {
    // Przekierowanie do strony głównej
    window.location.href = "main.html";
}

function goToLogin() {
    window.location.href = "login.html";
}

// Zmienna do przechowywania kategorii
let allCategories = [];
let categoriesVisible = false;

// Funkcja do pokazywania lub ukrywania kategorii
function toggleCategories() {
    const categoriesNav = document.getElementById("categoriesNav");

    // Sprawdź, czy kategorie są widoczne
    if (categoriesVisible) {
        categoriesNav.innerHTML = ''; // Usuń istniejące przyciski
        categoriesVisible = false;
    } else {
        // Jeśli kategorie są ukryte, to pokaż je
        displayCategories(allCategories);
        categoriesVisible = true;
    }
}

// Funkcja do pobierania kategorii z backendu
function getCategories() {
    var endpoint = "http://127.0.0.1:8000/movie/categories";

    // Wysłanie żądania GET do backendu
    return fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Błąd podczas pobierania kategorii: ', error);
    });
}

// Funkcja do inicjalizacji kategorii
function initializeCategories() {
    getCategories()
        .then((data) => {
            // Przypisz pobrane kategorie do zmiennej
            allCategories = data;
        });
}

// Funkcja do wyświetlania kategorii na stronie
function displayCategories(categories) {
    const categoriesNav = document.getElementById("categoriesNav");

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", function() {
            loadMoviesByCategory(category.id);
        });
        categoriesNav.appendChild(categoryButton);
    });
}

// Wywołaj funkcję inicjalizacji kategorii przy załadowaniu strony
window.onload = initializeCategories;


// Funkcja do pobierania i wyświetlania filmów dla danej kategorii
function loadMoviesByCategory(categoryId) {
    var endpoint = `http://127.0.0.1:8000/movie/${categoryId}`;
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((movies) => {
        // Obsługa danych otrzymanych z backendu
        displayMovies(movies);
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania filmów dla danej kategorii: ', error);
    });
}
function displayMovies(movies) {
    const moviesSection = document.getElementById("movie-section");
    moviesSection.innerHTML = ''; // Wyczyść istniejące filmy przed dodaniem nowych

    let moviesArray = Array.isArray(movies) ? movies : [movies]; // Jeśli nie jest tablicą, utwórz tablicę

    moviesArray.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.setAttribute('data-id',movie.id);

        const titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;
        titleElement.setAttribute('data-id',movie.id);

        const imgElement = document.createElement("img");
        imgElement.src = "../img/image.png";
        imgElement.alt = movie.title;
        imgElement.setAttribute('data-id',movie.id);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = movie.description;
        descriptionElement.setAttribute('data-id',movie.id);

        movieElement.appendChild(imgElement);
        movieElement.appendChild(titleElement);

        movieElement.appendChild(descriptionElement);

        moviesSection.appendChild(movieElement);
    });
}

function randomMovie() {
    // Logika dla przycisku "Losowy Film"
    alert("Losowy Film");
}

function profile() {
    // Logika dla przycisku "Profil"
    alert("Profil");
}
// function randomMovieCategories() {
//     const categoriesNav = document.getElementById("random-movies");
//     // Sprawdź, czy kategorie są widoczne
//     if (categoriesVisible) {
//         categoriesNav.innerHTML = ''; // Usuń istniejące przyciski
//         categoriesVisible = false;
//     } else {
//         // Jeśli kategorie są ukryte, to pokaż je
//         displayCategories(allCategories);
//         categoriesVisible = true;
//     }
// }
// Funkcja do pobierania losowego filmu dla danej kategorii
function loadRandomMovieByCategory(category_id) {
    var endpoint = `http://127.0.0.1:8000/movie/random/${category_id}`;
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((randomMovie) => {
        // Obsługa danych otrzymanych z backendu
        displayRandomMovie(randomMovie);
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania losowego filmu dla danej kategorii: ', error);
    });
}

// Funkcja do wyświetlania informacji o losowym filmie
function displayRandomMovie(randomMovie) {
    const moviesSection = document.getElementById("movie-section");
    moviesSection.innerHTML = ''; // Wyczyść istniejące filmy przed dodaniem nowych

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.setAttribute('data-id', randomMovie.id);

    const titleElement = document.createElement("h2");
    titleElement.textContent = randomMovie.title;
    titleElement.setAttribute('data-id', randomMovie.id);

    const imgElement = document.createElement("img");
    imgElement.src = "../img/image.png";
    imgElement.alt = randomMovie.title;
    imgElement.setAttribute('data-id', randomMovie.id);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = randomMovie.description;
    descriptionElement.setAttribute('data-id', randomMovie.id);

    movieElement.appendChild(imgElement);
    movieElement.appendChild(titleElement);
    movieElement.appendChild(descriptionElement);

    moviesSection.appendChild(movieElement);
}

function toggleRandomCategories() {
    const categoriesNav = document.getElementById("categoriesNav");

    // Sprawdź, czy kategorie są widoczne
    if (categoriesVisible) {
        categoriesNav.innerHTML = ''; // Usuń istniejące przyciski
        categoriesVisible = false;
    } else {
        // Jeśli kategorie są ukryte, to pokaż je
        displayRandomCategories(allCategories);
        categoriesVisible = true;
    }
}

// Zmodyfikuj funkcję displayCategories, aby dodatkowo ukrywała przyciski kategorii po kliknięciu
function displayRandomCategories(categories) {
    const categoriesNav = document.getElementById("categoriesNav");

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", function() {
            loadRandomMovieByCategory(category.id);
            toggleCategories(); // Dodaj to, aby schować przyciski po kliknięciu
        });
        categoriesNav.appendChild(categoryButton);
    });
}

// Wywołaj funkcję inicjalizacji kategorii przy załadowaniu strony
window.onload = function () {
    initializeCategories();
    displayCategories(allCategories);
};

const searchBar = document.getElementById('search');

searchBar.addEventListener('keyup', function() {
    if (!searchBar.value) {
        // Jeśli input jest pusty, wyświetl wszystkie filmy
        displayAllMovies();
    } else {
        // W przeciwnym razie, wykonaj wyszukiwanie
        searchMovies();
    }
});

function searchMovies() {
    const movieTitle = searchBar.value;
    const endpoint = `http://127.0.0.1:8000/movie/name/${movieTitle}`;

    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((movies) => {
        displaySearchMovies(movies);
    })
    .catch((error) => {
        console.error('Błąd podczas wyszukiwania filmów: ', error);
    });
}

function displaySearchMovies(movies) {
    const moviesSection = document.getElementById("movie-section");
    moviesSection.innerHTML = '';

    if (movies && movies.length > 0) {
        let moviesArray = Array.isArray(movies) ? movies : [movies];
        moviesArray.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.setAttribute('data-id', movie.id);

            const titleElement = document.createElement("h2");
            titleElement.textContent = movie.title;
            titleElement.setAttribute('data-id', movie.id);

            const imgElement = document.createElement("img");
            imgElement.src = "../img/image.png";
            imgElement.alt = movie.title;
            imgElement.setAttribute('data-id', movie.id);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = movie.description;
            descriptionElement.setAttribute('data-id', movie.id);

            movieElement.appendChild(imgElement);
            movieElement.appendChild(titleElement);
            movieElement.appendChild(descriptionElement);
            moviesSection.appendChild(movieElement);
        });
    } else {
        // Dodaj informację o braku filmów, np. wiadomość "Brak filmów do wyświetlenia"
        const noMoviesElement = document.createElement("p");
        noMoviesElement.textContent = "Brak filmów do wyświetlenia";
        moviesSection.appendChild(noMoviesElement);
    }
}

function displayAllMovies() {    
    var endpoint = "http://127.0.0.1:8000/movie/search";
    const moviesContainer = document.getElementById("movie-section");
    moviesContainer.innerHTML = ''; 
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        data.forEach(movie => {
            const movieDiv = document.createElement('button');
            movieDiv.classList.add('movie'); // Dodajemy klasę do stylizacji (opcjonalne)
            movieDiv.setAttribute('data-id', movie.id);

            const image = document.createElement('img');
            image.src = 'https://a.allegroimg.com/original/117865/a3b32d1b41bd9c4957632e04337a/KALENDARZ-SCIENNY-FORMAT-A4-DLA-MECHANIKA-NAGIE-KOBIETY-2024-ROK-PREZENT-Y4-Kod-producenta-KALENDARZ-SCIENNY-A4';
            
            image.setAttribute('data-id', movie.id);

            const titleElement = document.createElement('h2');
            titleElement.textContent = movie.title;
            titleElement.setAttribute('data-id', movie.id);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = movie.description;
            descriptionElement.setAttribute('data-id', movie.id);

            // Dodajemy elementy do diva filmu
            movieDiv.appendChild(image);
            movieDiv.appendChild(titleElement);
            movieDiv.appendChild(descriptionElement);

            // Dodajemy div filmu do kontenera na stronie
            moviesContainer.appendChild(movieDiv);
        });
    }).catch((error) => {
        console.log(error);
    });

    moviesContainer.addEventListener('click', function(event) {
        // Sprawdzamy, czy kliknięto w przycisk
        if (event.target.getAttribute('data-id')) {
            // Pobierz identyfikator z atrybutu data-id
            const movieId = event.target.getAttribute('data-id');
            
            // Wywołaj funkcję showMovieDetails z przekazanym parametrem movieId
            window.location.href = 'movie.html?movieId=' + movieId;
        }
    });
}
