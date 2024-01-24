window.onload = function() {
    showProfileDetails();
    showMyList();
    checkIfLogged();
}

function goToHomePage() {
    window.location.href = "main.html";
}

function goToLogin() {
    window.location.href = "login.html";
}

function goToProfile(){
    window.location.href = "profile.html";
}

function checkIfLogged() {
    console.log(localStorage.getItem('userToken'))
    if (localStorage.getItem('userToken')) {
        const loginButton = document.getElementById('login');
        const logoutButton = document.getElementById('logout');
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.clear
    window.location.href = 'login.html';
  }

 
function showProfileDetails() {
    var endpoint = 'http://127.0.0.1:8000/auth/me';
    const movieDescription = document.getElementById('profile-datails');
    const token = localStorage.getItem("userToken");
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        const username = document.getElementById("username");
        username.textContent = data.username;
    
        const email = document.getElementById("email");
        email.textContent += data.email;
    
        const rank = document.getElementById("rank");
        rank.textContent += data.rank;
    }).catch((error) => {
        console.log(error);
    });
}

function showMyList() {
    var endpoint = 'http://127.0.0.1:8000/movie_list/list';
    const token = localStorage.getItem("userToken");
    const moviesContainer = document.querySelector('.my-list-movies');
    
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
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

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('onclick', `deleteFromList(\'${movie.id}\')`);
            deleteButton.textContent = 'Usuń z listy';

            movieDiv.appendChild(image);
            movieDiv.appendChild(titleElement);
            movieDiv.appendChild(descriptionElement);
            movieDiv.appendChild(deleteButton);
        
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

function deleteFromList(movieId) {
    endpoint = 'http://127.0.0.1:8000/movie_list/' + movieId;
    const token = localStorage.getItem("userToken");
    fetch(endpoint, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    location.href = location.href;
}






