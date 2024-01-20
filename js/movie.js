function showMovieDetails(movieId) {
    var endpoint = "http://127.0.0.1:8000/movieid/" + movieId;
    const movieDescription = document.getElementById('movie-description');

    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        window.location.href = "movie.html";
        
    }).catch((error) => {
        console.log(error);
    });
}



// Dodaj funkcję obsługującą przycisk "Dodaj ocenę"
function addRating() {
    // Logika dla przycisku "Dodaj ocenę"
    alert("Dodaj ocenę");
}

