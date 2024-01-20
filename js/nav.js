function goToHomePage() {
    // Przekierowanie do strony głównej
    window.location.href = "main.html";
}

function goToLogin() {
    window.location.href = "login.html";
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

function randomMovie() {
    // Logika dla przycisku "Losowy Film"
    alert("Losowy Film");
}

function profile() {
    // Logika dla przycisku "Profil"
    alert("Profil");
}