/**
 * Displays 12 random users with basic information.
 * Returns an object that was parsed using the "Response Object" methods.
 */
const fetchAPI = async () => {
    try {
        const responseObject = await fetch("https://randomuser.me/api/?results=12")
        const randomUsers = await responseObject.json();
        return randomUsers;
    } catch (err) {
        console.log("Something went wrong with fetching from the API", err)
    }
}


let gallery = document.querySelector("#gallery")
const generateHTML = async () => {
    let users = await fetchAPI()
    let results = await users.results
    let html = ""
    html += results.map(user => `
    <div class = "card"> 
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="${user.name.title} ${user.name.first} ${user.name.last}"/>
    </div>
    <div class="card-info-container"> 
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.city} ${user.state}</p>
    </div>
    </div>
    `).join(" ")
    gallery.insertAdjacentHTML("afterbegin", html)
}



const modalWindow = () => {
    const modalContainer = document.createElement("div")
    gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling)
}

generateHTML();
addElement();
{/* 

<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>

// IMPORTANT: Below is only for exceeds tasks 
<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div> 

*/}

