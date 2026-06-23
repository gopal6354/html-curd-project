
let editIndex = -1;
let saveMainData = [
    { name: 'Gopal', email: 'gp@gmail.com', age: '24', gender: 'Male', hobby: 'Reading', country: 'India', state: 'Gujarat', city: 'Surat' },
    { name: 'sarvesh', email: 'sp@gmaill.com', age: '28', gender: 'Male', hobby: 'Reading, Travelling', country: 'India', state: 'Maharashtra', city: 'Mumbai' }
];

let saveTime = [new Date().toLocaleString(), new Date().toLocaleString()];

document.addEventListener("DOMContentLoaded", function () {
    showData();
});


//create
document.getElementById("regForm").addEventListener("submit", function (event) {

    event.preventDefault();

    document.getElementById("nameEr").innerText = "";
    document.getElementById("emailEr").innerText = "";
    document.getElementById("ageEr").innerText = "";
    document.getElementById("genderEr").innerText = "";
    document.getElementById("checkboxEr").innerText = "";
    document.getElementById("countryEr").innerText = "";
    document.getElementById("stateEr").innerText = "";
    document.getElementById("cityEr").innerText = "";

    let isValid = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const checkedGenderElement = document.querySelector('input[name="gender"]:checked');
    const gender = checkedGenderElement ? checkedGenderElement.value : "";
    const checkedHobbies = document.querySelectorAll('input[name="hobby"]:checked');
    let hobbyList = [];
    checkedHobbies.forEach(function (box) {
        hobbyList.push(box.value);
    });
    const hobby = hobbyList.join(', ');

    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value

    if (name === "") {
        document.getElementById("nameEr").innerText = "Name field cannot be left blank.";
        isValid = false;
    } else if (name.match(/[0-9]/)) {
        document.getElementById("nameEr").innerText = "Name cannot contain numbers.";
        isValid = false
    }
    if (email === "") {
        document.getElementById("emailEr").innerText = "Email field cannot be left blank.";
        isValid = false;
    } else if (!email.includes("@") || !email.endsWith(".com")) {
        document.getElementById("emailEr").innerText = "Email must contain '@' and end with '.com'.";
        isValid = false;
    }
    if (age === "") {
        document.getElementById("ageEr").innerText = "Age field is required.";
        isValid = false;
    } else if (parseInt(age) <= 0 || parseInt(age) > 110) {
        document.getElementById("ageEr").innerText = "Age must be a number between 1 and 110.";
        isValid = false;
    }
    if (!checkedGenderElement) {
        document.getElementById("genderEr").innerText = "Please pick a gender option.";
        isValid = false;
    }
    if (checkedHobbies.length === 0) {
        document.getElementById("checkboxEr").innerText = "Please select at least one hobby.";
        isValid = false;
    }
    if (country === "") {
        document.getElementById("countryEr").innerText = "Please select country.";
        isValid = false;
    }
    if (state === "") {
        document.getElementById("stateEr").innerText = "Pleasae select state.";
        isValid = false
    }
    if (city === "") {
        document.getElementById("cityEr").innerText = "Please select city."
        isValid = false
    }
    if (!isValid) {
        return;
    }

    console.log(name, email, gender, hobby, country, state, city)

    const userData = { name, email, age, gender, hobby, country, state, city }

    if (editIndex > -1) {
        const newTime = new Date().toLocaleString()

        saveMainData[editIndex] = userData;
        saveTime[editIndex] = newTime;
        console.log(saveTime)
        editIndex = -1;

        document.getElementById('save').textContent = "Save";
        const cancelBtn = document.getElementById("cancelBtn");
        if (cancelBtn) cancelBtn.remove();

        console.log("Record updated successfully.");
        console.log("Time updated successfully.")
    } else {
        const timeDate = new Date().toLocaleString()

        saveMainData.push(userData);
        saveTime.push(timeDate)
        console.log(timeDate)
        console.log("Record saved successfully");

        console.log(saveMainData)
        console.log(saveTime)

    }

    showData();

    document.getElementById("regForm").reset();
    stateDropdown.innerHTML = '<option value="">Select State</option>';
    cityDropdown.innerHTML = '<option value="">Select City</option>';


})

//show
function showData() {
    renderTable(saveMainData);
}


function renderTable(dataArray) {
    const tBody = document.getElementById("tableBody");
    tBody.innerHTML = "";

    dataArray.forEach(function (user, index) {

        const Index = saveMainData.indexOf(user);
        const row = document.createElement("tr");

        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td> 
            <td>${user.gender}</td>
            <td>${user.hobby}</td>
            <td>${user.country}</td>
            <td>${user.state}</td>
            <td>${user.city}</td>
            <td><button class="btn btn-warning btn-sm" onclick="editUser(${Index})">Update</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${Index})">Delete</button></td>
        `;

        tBody.appendChild(row);
    });
    console.log("All save record.")
    console.log(saveMainData)
    console.log(saveTime)
}

//delete 

function deleteUser(indexToRemoval) {

    let txt;
    if (confirm("Are you sure you want to delete your record?")) {
        saveMainData.splice(indexToRemoval, 1);
        saveTime.splice(indexToRemoval, 1)

        showData();
        console.log(saveTime)
        console.log(saveMainData)
        console.log("Record Delete successfully.")
        clearFormAndDropdowns()

    }
    else {
        showData();
        console.log(saveMainData)

    }
}

//clear form
function clearFormAndDropdowns() {
    document.getElementById("regForm").reset();
    
    const stateSel = document.getElementById("state");
    const citySel = document.getElementById("city");
    
    if (stateSel) stateSel.innerHTML = '<option value="">Select State</option>';
    if (citySel) citySel.innerHTML = '<option value="">Select City</option>';
}

function cancel() {
    editIndex = -1;

    clearFormAndDropdowns();

    document.getElementById('save').textContent = "Save";

    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
        cancelBtn.remove();
    }
    
    console.log("Cancel button removed.");
}

//update


function editUser(index) {
    console.log("edit function call")

    editIndex = index;
    const user = saveMainData[index];
    console.log(user)

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age


    const genderRadio = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
    if (genderRadio) genderRadio.checked = true;


    document.querySelectorAll('input[name="hobby"]').forEach(box => box.checked = false);
    if (user.hobby) {
        user.hobby.split(', ').forEach(h => {
            const box = document.querySelector(`input[name="hobby"][value="${h}"]`);
            if (box) box.checked = true;
        });
    }

    countryDropdown.value = user.country;
    countryDropdown.dispatchEvent(new Event('change'));

    stateDropdown.value = user.state;
    stateDropdown.dispatchEvent(new Event('change'));
    cityDropdown.value = user.city;

    const saveBtn = document.getElementById('save');
    saveBtn.textContent = "Update"; 


    if (!document.getElementById("cancelBtn")) {
        const cancelBtn = document.createElement("button");
        cancelBtn.id = "cancelBtn";
        cancelBtn.type = "button"; 
        cancelBtn.className = "btn-cancel";
        cancelBtn.textContent = "Cancel";

        saveBtn.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);

        cancelBtn.addEventListener("click", cancel);
    }


}



//serach data
function searchData() {
    const search = document.getElementById("searchInput").value.toLowerCase()
    const sort = document.getElementById('sortInput').value

    const filterData = saveMainData.filter(function (user) {

        const nameMatch = user.name.toLowerCase().includes(search);
        const emailMatch = user.email.toLowerCase().includes(search);
        const countryMatch = user.country.toLowerCase().includes(search);
        const stateMatch = user.state.toLowerCase().includes(search);
        const cityMatch = user.city.toLowerCase().includes(search);

        return nameMatch || emailMatch || countryMatch || stateMatch || cityMatch;
    });

    // console.log(sort)
    if (sort === "asc") {
        filterData.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    } else if (sort === "desc") {
        filterData.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        });
    }
    console.log("this is filter data")
    console.log(filterData)

    renderTable(filterData)
}


const indiaStates = ["Gujarat", "Maharashtra", "Karnataka", "Rajasthan"];
const usaStates = ["California", "New York", "Texas", "Florida"];

const cities = {

    "Gujarat": ["Surat", "Ahmedabad", "Vadodara", "Rajkot", "Bhavnagar"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],

    "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Fresno"],
    "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
    "Texas": ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
};


const countryDropdown = document.getElementById('country');
const stateDropdown = document.getElementById('state');
const cityDropdown = document.getElementById('city');


countryDropdown.addEventListener('change', function () {
    const pickedCountry = countryDropdown.value;
    console.log(pickedCountry)

    stateDropdown.innerHTML = '<option value="">Select State</option>';
    cityDropdown.innerHTML = '<option value="">Select City</option>';

    let chosenStates = [];  

    if (pickedCountry === "India") {
        chosenStates = indiaStates;
        console.log(indiaStates)
    } else if (pickedCountry === "USA") {
        chosenStates = usaStates;
    } 

    chosenStates.forEach(function (state) {
        const opt = document.createElement('option');
        opt.value = state;
        opt.textContent = state;
        stateDropdown.appendChild(opt);
    }); 
});

stateDropdown.addEventListener('change', function () {
    const pickedState = stateDropdown.value;

    cityDropdown.innerHTML = '<option value="">Select City</option>';

    if (pickedState && cities[pickedState]) {
        cities[pickedState].forEach(function (city) {
            const opt = document.createElement('option');
            opt.value = city;
            opt.textContent = city;
            cityDropdown.appendChild(opt);
        });
    }
    console.log(cityDropdown)
});
