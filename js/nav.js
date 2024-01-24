let allCategories = [];
let categoriesVisible = false;
const searchBar = document.getElementById('search');

window.onload = function () {
    getCategories();
    displayCategories(allCategories);
    checkIfLogged();
};

searchBar.addEventListener('keyup', function() {
    if (!searchBar.value) {
        displayAllMovies();
    } else {
        searchMovies();
    }
});

function goToHomePage() {
    window.location.href = "main.html";
}

function goToLogin() {
    window.location.href = "login.html";
}

function goToProfile(){
    if (localStorage.getItem('userToken') === null) {
        window.location.href = "login.html";
    }
    else
        window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.clear
    window.location.href = 'login.html';
  }

function toggleCategories() {
    const categoriesNav = document.getElementById("categoriesNav");

    if (categoriesVisible) {
        categoriesNav.innerHTML = '';
        categoriesVisible = false;
    } else {
        displayCategories(allCategories);
        categoriesVisible = true;
    }
}

function getCategories() {
    var endpoint = "http://127.0.0.1:8000/movie/categories";

    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Błąd podczas pobierania kategorii: ', error);
    })
    .then((data) => {
        allCategories = data;
    });
}

function displayCategories(categories) {
    const categoriesNav = document.getElementById("categoriesNav");
    
    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", function() {
            loadMoviesByCategory(category.id);
        });
        console.log(categoryButton)
        categoriesNav.appendChild(categoryButton);
    });
}

function checkIfLogged() {
    if (localStorage.getItem('userToken')) {
        const loginButton = document.getElementById('login');
        const logoutButton = document.getElementById('logout');
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }
}

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
        displayMovies(movies);
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania filmów dla danej kategorii: ', error);
    });
}

function displayMovies(movies) {
    const moviesSection = document.getElementById("movie-section");
    moviesSection.innerHTML = ''; 

    let moviesArray = Array.isArray(movies) ? movies : [movies];
    moviesArray.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.setAttribute('data-id',movie.id);

        const titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;
        titleElement.setAttribute('data-id',movie.id);

        const imgElement = document.createElement("img");
        imgElement.src = "../img/popcorn.png";
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
        displayRandomMovie(randomMovie);
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania losowego filmu dla danej kategorii: ', error);
    });
}


function displayRandomMovie(randomMovie) {
    const moviesSection = document.getElementById("movie-section");
    moviesSection.innerHTML = '';

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.setAttribute('data-id', randomMovie.id);

    const titleElement = document.createElement("h2");
    titleElement.textContent = randomMovie.title;
    titleElement.setAttribute('data-id', randomMovie.id);

    const imgElement = document.createElement("img");
    imgElement.src = "../img/popcorn.png";
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
    if (categoriesVisible) {
        categoriesNav.innerHTML = ''; 
        categoriesVisible = false;
    } else {
        displayRandomCategories(allCategories);
        categoriesVisible = true;
    }
}

function displayRandomCategories(categories) {
    const categoriesNav = document.getElementById("categoriesNav");

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", function() {
            loadRandomMovieByCategory(category.id);
            toggleCategories();
        });
        categoriesNav.appendChild(categoryButton);
    });
}

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
            imgElement.src = "../img/popcorn.png";
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
            movieDiv.classList.add('movie');
            movieDiv.setAttribute('data-id', movie.id);

            const image = document.createElement('img');
            image.src = '../img/popcorn.png';
            
            image.setAttribute('data-id', movie.id);

            const titleElement = document.createElement('h2');
            titleElement.textContent = movie.title;
            titleElement.setAttribute('data-id', movie.id);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = movie.description;
            descriptionElement.setAttribute('data-id', movie.id);

            movieDiv.appendChild(image);
            movieDiv.appendChild(titleElement);
            movieDiv.appendChild(descriptionElement);

            moviesContainer.appendChild(movieDiv);
        });
    }).catch((error) => {
        console.log(error);
    });

    moviesContainer.addEventListener('click', function(event) {

        if (event.target.getAttribute('data-id')) {
            // Pobierz identyfikator z atrybutu data-id
            const movieId = event.target.getAttribute('data-id');

            window.location.href = 'movie.html?movieId=' + movieId;
        }
    });
}
function goToLogin() {
    window.location.href = "login.html";
}
