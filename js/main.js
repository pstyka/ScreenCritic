window.onload = displayMovies();

function displayMovies() {
    var endpoint = "http://127.0.0.1:8000/movie/search";
    const moviesContainer = document.getElementById("movie-section");
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
            image.src = '../img/jaroslaw-kaczynski-753x424-gov-pl.jpg';
            
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
            showMovieDetails(movieId);
        }
    });
}

function add_movie_to_list() {
    var endpoint = "http://127.0.0.1:8000/categories";
    fetch(endpoint, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}
