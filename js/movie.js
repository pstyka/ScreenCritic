document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    showMovieDetails(movieId);
});

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

function showMovieDetails(movieId) {
    var endpoint = 'http://127.0.0.1:8000/movieid/' + movieId;
    const movieDescription = document.getElementById('movie-description');
    const button_add_to_list = document.getElementById('button-add-to-list');

    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
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
        
        button_add_to_list.setAttribute('data_id', movieId);

    }).catch((error) => {
        console.log(error);
    });
}

async function addComment() {

    var newCommentText = document.getElementById("new-comment").value;

    if (newCommentText.trim() === "") {
        alert("Komentarz nie może być pusty!");
        return;
    }

    const rating = document.querySelector('.range-rating').value;
    const comment = document.querySelector('#new-comment');

    await add(rating, comment.value);

    comment.value = "";


    alert("Twój komentarz został dodany!");

    getComments();
}

async function add(rating, comment){
    
    var endpoint = 'http://127.0.0.1:8000/review';
    const token = localStorage.getItem("userToken");
    const movieDescription = document.getElementById('movie-description');

    const data = {
        rating: rating,
        comment: comment,
        movie_id: movieId
    }
    
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: 'include',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
}

function getComments() {
    const endpoint = `http://127.0.0.1:8000/review/${movieId}`;
    const commentsContainer = document.querySelector("#comments-container");
    commentsContainer.innerHTML = "";
    
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            var newCommentElement = document.createElement("div");
            newCommentElement.classList.add('comment');

            var nameContent = document.createElement("p");
            nameContent.textContent = element.first_name + " " + element.last_name;

            var commentContent = document.createElement("p");
            commentContent.textContent = element.comment;
            
            var ratingContent = document.createElement("p");
            ratingContent.textContent = element.rating +"/10";
            
            newCommentElement.appendChild(nameContent);
            newCommentElement.appendChild(commentContent);
            newCommentElement.appendChild(ratingContent);


            commentsContainer.appendChild(newCommentElement);
        });
        
    }).catch((error) => {
        console.log(error);
    });
    
}

getComments();