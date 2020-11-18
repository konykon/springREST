function fetchJson(url) {
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    });
}

$(document).ready(function () {
    fetchJson('http://localhost:8080/employees')
        .then(function (data) {
            generateData(data);
            console.log(data);
        })
});

// const generateData = (data) => {
//     $("#list").html("");
//     data.forEach(employee => {
//         let $li = $("<li></li>").appendTo("#list");
//         $li.html(`${employee.id} ${employee.name} ${employee.role}<a data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-pen"></i></a>`);
//     });
// }

const generateData = (data) => {
    $("#table").html("");
    data.forEach(employee => {
        let $tr = $("<tr></tr>").appendTo("#table");
        let $tdId = $("<td></td>").appendTo($tr);
        let $tdName = $("<td></td>").appendTo($tr);
        let $tdRole = $("<td></td>").appendTo($tr);
        let $tdEdit = $(`<td id=${employee.id}></td>`).appendTo($tr);
        
        $tdId.html(`${employee.id}`);
        $tdName.html(`${employee.name}`);
        $tdRole.html(`${employee.role}`);
        $tdEdit.html(`<a data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-pen"></i></a>`);
        
        $("#card").html(`Under construction...`);
    });
}

function addEmployee() {
    let url = 'http://localhost:8080/employees';
    let name = document.getElementById('name').value;
    let role = document.getElementById('listRoles');
    let roleValue = role.options[role.selectedIndex].value;
    const employee = {
        name: name,
        role: roleValue
    };

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateEmployee() {
    let name = document.getElementById('nameToUpdate').value;
    let role = document.getElementById('roleToUpdate').value;
    fetchJson('http://localhost:8080/employees')
        .then(function (data) {
            data.forEach(employee => {
                if (name == employee.name) {
                    let id = employee.id;
                    $.ajax({
                        type: 'PUT',
                        url: 'http://localhost:8080/employees/' + id,
                        data: JSON.stringify({
                            name: name,
                            role: role
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: function (data) {
                            document.getElementById("msgUpdate").innerHTML = `Employee ${data.name} is updated. Refresh page.`;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }
            });
        });
}

function readEmployee() {
    let name = document.getElementById('nameToRead').value;
    fetchJson('http://localhost:8080/employees')
        .then(function (data) {
            data.forEach(employee => {
                if (name == employee.name) {
                    let id = employee.id;
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8080/employees/' + id,
                        success: function (data) {
                            document.getElementById("readMsg").innerHTML = `${data.name} is a ${data.roleName} and gets paid ${data.salary} euros.`;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }
            });
        });
}

function deleteEmployee() {
    let name = document.getElementById('nameToDelete').value;
    fetchJson('http://localhost:8080/employees')
        .then(function (data) {
            data.forEach(employee => {
                if (name == employee.name) {
                    let id = employee.id;
                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:8080/employees/' + id,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: function () {
                            document.getElementById("msgDel").innerHTML = `Employee is deleted.`;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }
            });
        });
}