function goToHomePage() {
    // Przekierowanie do strony głównej
    window.location.href = "main.html";
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


//BREAKPOINT
//  function categories() {
//      var endpoint = "http://127.0.0.1:8000/movie/categories";

//     // Wysłanie żądania GET do backendu
//     fetch(endpoint, {
//         method: "GET",
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         // Obsługa danych otrzymanych z backendu
//         displayCategories(data);
//     })
//     .catch((error) => {
//         console.error('Błąd podczas wczytywania kategorii: ', error);
//     });
// }

// // Funkcja do wyświetlania kategorii na stronie
// function displayCategories(categories) {
//     const categoriesNav = document.getElementById("categoriesNav");

//     categories.forEach(category => {
//         const categoryButton = document.createElement("button");
//         categoryButton.textContent = category.name;
//         // Dodanie obsługi zdarzenia dla przycisku kategorii
//         categoryButton.addEventListener("click", function() {
//             // Możesz dodać kod obsługujący wybór kategorii
//             alert("Wybrano kategorię: " + category.name);
//             loadMoviesByCategory(category.id);
//         });
//         categoriesNav.appendChild(categoryButton);
//     });
// }


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

// Funkcja do wyświetlania filmów na stronie
function displayMovies(movies) {
    const moviesSection = document.getElementById("moviesSection");
    moviesSection.innerHTML = ''; // Wyczyść istniejące filmy przed dodaniem nowych

    let moviesArray = Array.isArray(movies) ? movies : [movies]; // Jeśli nie jest tablicą, utwórz tablicę

    moviesArray.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

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