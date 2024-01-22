document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    showMovieDetails(movieId);
});

function showMovieDetails(movieId) {
    var endpoint = 'http://127.0.0.1:8000/movieid/' + movieId;
    const movieDescription = document.getElementById('movie-description');
    
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        const title = document.getElementById("title");
        title.textContent = data.title;
    
        const director = document.getElementById("director");
        director.textContent += data.director;
    
        const premiereDate = document.getElementById("premiereDate");
        premiereDate.textContent += data.release_date;
    
        const description = document.getElementById("description");
        description.textContent = data.description;
    
        const average_rating = document.getElementById("averageRating");
        average_rating.textContent += data.average_rating;  
    }).catch((error) => {
        console.log(error);
    });
}

function addComment() {
    // Pobierz treść nowego komentarza z textarea
    var newCommentText = document.getElementById("new-comment").value;

    // Sprawdź, czy komentarz nie jest pusty
    if (newCommentText.trim() === "") {
        alert("Komentarz nie może być pusty!");
        return;
    }

    // Stwórz nowy element komentarza
    var newCommentElement = document.createElement("div");
    newCommentElement.textContent = newCommentText;

    // Dodaj nowy komentarz do kontenera komentarzy
    var commentsContainer = document.getElementById("comments-container");
    commentsContainer.appendChild(newCommentElement);

    // Wyczyść pole tekstowe po dodaniu komentarza
    document.getElementById("new-comment").value = "";

    alert("Twój komentarz został dodany!");
}