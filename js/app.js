
/**
 * Displays 12 random users with basic information.
 * Returns an object that was parsed using the "Response Object" methods.
 */
const generateRandomUsers = (data) => generateHTML(data)
const parseResponseObject = (res) => res.json();

const fetchAPI = async () => {
    const responseObject = await fetch("https://randomuser.me/api/?results=12")
    const parsedObject = await parseResponseObject(responseObject)
    generateRandomUsers(parsedObject)
    clickHandler(parsedObject);
}

// Once fetching is successful, this code runs which displays all 12 random users.
let gallery = document.querySelector("#gallery")
const generateHTML = async (data) => {
    const results = data.results
    let html = ""
    html += results.map(user => `
    <div class = "card"> 
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="${user.name.title} ${user.name.first} ${user.name.last}"/>
    </div>
    <div class="card-info-container"> 
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city} ${user.location.state}</p>
    </div>
    </div>
    `).join(" ")
    gallery.insertAdjacentHTML("afterbegin", html)
}

/**
 * createModal function creates the modal container and its initial contents. 
 * I will then use another function to append the random user data to the created div by this function.
 */
const createModal = () => {
    let modal = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        </div>
    <div>
    </div>
    `
    gallery.insertAdjacentHTML("afterend", modal)
    document.querySelector(".modal-container").style.display = "none";
    document.getElementById("modal-close-btn").addEventListener("click", () => {
        document.querySelector(".modal-container").style.display = "none"
    })
}

// This function will add the appropriate details of the card that was clicked in the modal
const appendDataToModal = (randomUserData) => {
    const data = new Date(`${randomUserData.dob.date}`);
    const month = data.getMonth() + 1;
    const day = data.getDate();
    const year = data.getFullYear();
    const mmddyy = `${month}/${day}/${year}`;
    let modalDetails = document.querySelector(".modal-info-container");
    modalDetails.innerHTML = "";
    modalDetails.innerHTML = `
    <img class="modal-img" src="${randomUserData.picture.large}" alt="profile picture"/>
    <h3 id="name" class="modal-name cap">${randomUserData.name.first} ${randomUserData.name.last}</h3>
    <p class="modal-text">${randomUserData.email}</p>
    <p class="modal-text cap">${randomUserData.location.city}</p>
    <hr/>
    <p class="modal-text">${randomUserData.cell}</p>
    <p class="modal-text">${randomUserData.location.street.number} ${randomUserData.location.street.name} ${randomUserData.location.city} ${randomUserData.location.state} ${randomUserData.location.postcode} </p>
    <p class="modal-text">${mmddyy}</p>
    `
}

// A function that adds event listener to every class named card.
let currentCard = 0;
const clickHandler = (data) => {
    const results = data.results
    let cards = document.querySelectorAll(".card")
    cards.forEach((card, index) => card.addEventListener("click", () => {
        document.querySelector(".modal-container").style.display = "block"
        currentCard = index;
        appendDataToModal(results[currentCard])
    }))
}

fetchAPI();
createModal();
