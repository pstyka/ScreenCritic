function goToHomePage() {
    // Przekierowanie do strony głównej
    window.location.href = "main.html";
}

// Dodaj funkcje obsługujące przyciski (categories, randomMovie, profile)
// function categories() {
//     var endpoint = "http://127.0.0.1:8000/categories";
//     fetch(endpoint, {
//         method: "GET",
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => response.json()).then((data) => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     });
// }

 function categories() {
     var endpoint = "http://127.0.0.1:8000/movie/categories";

    // Wysłanie żądania GET do backendu
    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        // Obsługa danych otrzymanych z backendu
        displayCategories(data);
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania kategorii: ', error);
    });
}

// Funkcja do wyświetlania kategorii na stronie
function displayCategories(categories) {
    const categoriesNav = document.getElementById("categoriesNav");

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        // Dodanie obsługi zdarzenia dla przycisku kategorii
        categoryButton.addEventListener("click", function() {
            // Możesz dodać kod obsługujący wybór kategorii
            alert("Wybrano kategorię: " + category.name);
            loadMoviesByCategory(category.id);
        });
        categoriesNav.appendChild(categoryButton);
    });
}


function loadMoviesByCategory(categoryId) {
    var endpoint = `http://127.0.0.1:8000/movie/category/${categoryId}`;

    fetch(endpoint, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Dane otrzymane z backendu:', data);

        // Upewnij się, że data to obiekt JSON
        if (typeof data === 'object' && data !== null) {
            // Obsługa danych otrzymanych z backendu
            displayMoviesFromFetch(data);
        } else {
            console.error('Błąd podczas wczytywania filmów dla danej kategorii: Nieprawidłowy format danych');
        }
    })
    .catch((error) => {
        console.error('Błąd podczas wczytywania filmów dla danej kategorii: ', error);
    });
}

function displayMoviesFromFetch(movies) {
    const favoriteMoviesSection = document.getElementById("favoriteMoviesSection");

    movies.forEach(movie => {
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

function randomMovie() {
    // Logika dla przycisku "Losowy Film"
    alert("Losowy Film");
}

function profile() {
    // Logika dla przycisku "Profil"
    alert("Profil");
}