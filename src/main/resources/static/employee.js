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
            fillTable(data);
            console.log(data);
        })
});

function addCell(tr, val) {
    let td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td);
}

function addRow(table, val_1, val_2, val_3, val_4) {
    let tr = document.createElement('tr');
    addCell(tr, val_1);
    addCell(tr, val_2);
    addCell(tr, val_3);
    addCell(tr, val_4);
    table.appendChild(tr);
}

function fillTable(data) {
    let table = document.getElementById('table');
    data.forEach(employee => {
        addRow(table, employee.id, employee.name, employee.role, employee.salary);
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
        headers: { 'Content-Type': 'application/json' },
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
                        data: JSON.stringify({name: name, role: role}),
                        headers: { 'Content-Type': 'application/json' },
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
                        headers: { 'Content-Type': 'application/json' },
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

