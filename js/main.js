window.onload = displayMovies();

function displayMovies() {
    console.log(document.cookie);       //test
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

// Funkcja do wyświetlania profilu użytkownika
function displayProfile() {
    //window.location.href = "profile.html";
    var endpoint = "http://127.0.0.1:8000/auth/me";
    fetch(endpoint, {
        method: "GET",  // Używamy metody GET do pobrania danych o użytkowniku
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });

    localStorage.setItem('username', 'Grzesiek dupa a nie backendowiec');
    localStorage.setItem('email', 'adammeczydupa@gmail.com');
    localStorage.setItem('rank', 'użytkownik bambik');
    
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var rank = localStorage.getItem('rank');

    if (username && email && rank) {
        console.log(username, email, rank);
        var profileInfo = document.querySelector('.profile-info');
        profileInfo.innerHTML = `
            <h2>Username: ${username}</h2>
            <p>Email: ${email}</p>
            <p>Ranga: ${rank}</p>
        `;
    } else {
        goToLogin();
    }
}

function goToLogin() {
    window.location.href = "login.html";
}
