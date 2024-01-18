function generateTeamView() {
    var div = document.getElementById("teamTableDiv");
    let html = '';
    var isAdmin = document.getElementById("isAdmin").innerHTML;

    if (isAdmin == 'true') {
        html += `
        <button class="button" onclick="addTeamMemberDiv()">Add team member</button>
        <button class="button" onclick="removeTeamMemberDiv()">Remove team member</button>
        `
    }

    endpoint = "getYourTeam";
    fetch(endpoint, {
        method: 'GET',
        Credentials: 'include'
    }).then((response) => response.json()).then((data) => {
        if (data.message == "success") {
            if (data.team.length == 0) {
                html += '<h2>You are not in any team!</h2>'
            } else {
                html += `<div class="teamTableDiv__table">
                <table class = "teamTable">
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                `
                for (var i = 0; i < data.team.length; i++) {
                    if (data.team[i].name == null) {
                        data.team[i].name = 'Empty';

                    }
                    if (data.team[i].surname == null) {
                        data.team[i].surname = 'Empty';

                    }
                    if (data.team[i].phone == null) {
                        data.team[i].phone = 'Empty';

                    }
                    html += `
                    <tr>
                        <td >${data.team[i].name}</td>
                        <td>${data.team[i].surname}</td>
                        <td>${data.team[i].email}</td>
                        <td>${data.team[i].phone}</td>
                    </tr>
                    `
                }
                html += '</table></div>'
                div.innerHTML = html;
        }
        } else {
            alert('Something went wrong with you team! Please try again!');
        }
    }).catch((error) => {
        console.log(error);
    });
}