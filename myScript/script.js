// Select elements from the DOM
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const tableBody = document.getElementById("table-body");

// Create an array to store user data
let userData = [];

// Add event listeners to buttons
addBtn.addEventListener("click", addUser);
cancelBtn.addEventListener("click", cancelUser);
// Function to update user data in the table
function updateUser(index) {
    // Get the input values and update the user object
    const name = nameInput.value;
    const age = ageInput.value;
    userData[index].name = name;
    userData[index].age = age;

    // Clear the input fields
    nameInput.value = "";
    ageInput.value = "";

    // Show the add button and hide the cancel button
    addBtn.style.display = "inline-block";
    cancelBtn.style.display = "none";

    // Replace the edit event listener with the add event listener
    addBtn.removeEventListener("click", updateUser);
    addBtn.addEventListener("click", addUser);

    // Update the table
    updateTable();
}

// Function to add user data to the table
function addUser() {
    // Get the input values and create a new user object
    const name = nameInput.value;
    const age = ageInput.value;
    const user = { name, age };

    // Add the user object to the userData array
    userData.push(user);

    // Clear the input fields
    nameInput.value = "";
    ageInput.value = "";

    // Update the table
    updateTable();
}

// Function to remove user data from the table
function removeUser(index) {
    // Remove the user object from the userData array
    userData.splice(index, 1);

    // Update the table
    updateTable();
}

// Function to update the table with user data
function updateTable() {
    // Clear the table body
    tableBody.innerHTML = "";

    // Loop through the userData array and create a new row for each user
    for (let i = 0; i < userData.length; i++) {
        const user = userData[i];
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const removeBtn = document.createElement("button");
        const editBtn = document.createElement("button");


        // Set the text content and attributes for the new elements
        td1.textContent = user.name;
        td2.textContent = user.age;
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("class", "btn btn-danger btn-sm");
        removeBtn.addEventListener("click", function() {
            removeUser(i);
        });
        editBtn.textContent = "Edit";
        editBtn.setAttribute("class", "btn btn-primary btn-sm ml-2");
        editBtn.addEventListener("click", function() {
            // Update the input fields with the user data
            nameInput.value = user.name;
            ageInput.value = user.age;

            // Hide the add button and show the cancel button
            addBtn.style.display = "none";
            cancelBtn.style.display = "inline-block";

            // Replace the add event listener with the edit event listener
            addBtn.removeEventListener("click", addUser);
            addBtn.addEventListener("click", function() {
                updateUser(i);
            });
        });

        // Append the new elements to the table row
        td3.appendChild(removeBtn);
        td3.appendChild(editBtn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Append the table row to the table body
        tableBody.appendChild(tr);
    }
}

// Function to cancel adding or editing a user
function cancelUser() {
    // Clear the input fields
    nameInput.value = "";
    ageInput.value = "";

    // Show the add button and hide the cancel button
    addBtn.style.display = "inline-block";
    cancelBtn.style.display = "none";

    // Replace the edit event listener with the add event listener
    addBtn.addEventListener("click", addUser);
    addBtn.removeEventListener("click", updateUser);
}