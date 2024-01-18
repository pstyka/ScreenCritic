function read_movie_list() {
    var endpoint = "http://127.0.0.1:8000/movie/search";
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
