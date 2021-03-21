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
    <div class = "card> 
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="${user.name.title} ${user.name.first} ${user.name.last}"
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


generateHTML();


{/* <div class="card">
<div class="card-img-container">
    <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">first last</h3>
    <p class="card-text">email</p>
    <p class="card-text cap">city, state</p>
</div>
</div> */}