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
          const movieId = event.target.getAttribute('data-id');
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

function displayProfile() {
    var endpoint = "http://127.0.0.1:8000/auth/me";
    fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                window.location.href = 'main.html';
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        
    }).catch((error) => {
        console.log(error);
        
    });

    localStorage.setItem('username', 'Adam Męczydupa');
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


