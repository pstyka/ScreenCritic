function login() {
    const endpoint = "http://127.0.0.1:8000/auth/login";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', password);

    fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: loginData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Received:', data);
        localStorage.setItem('userToken', data.access_token);
        window.location.href = "main.html";
    })
    .catch((error) => {
        console.log('Error:', error);
        alert("Nie zalogowano :(");
    });
}

function register() {
    const endpoint = 'http://127.0.0.1:8000/auth/signup';
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const registerData = {
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Rejestracja udana");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Jak zwykle");
    });
}

function delete_account() {
    var endpoint = "http://127.0.0.1:8000/delete";
    fetch(endpoint, {
        method: "GET",
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

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}