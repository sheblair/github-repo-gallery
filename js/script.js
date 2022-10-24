// this is the div to display my profile overview
const overview = document.querySelector(".overview");

const username = "sheblair";

const getProfileInfo = async function () {
    const get = await fetch(`https://api.github.com/users/${username}`);
    const response = await get.json();
    console.log(response);
    displayUserInfo(response);
};

getProfileInfo();

const displayUserInfo = function (response) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
        `<figure><img alt="user avatar" src=${response.avatar_url} /></figure>
        <div>
            <p><strong>Name:</strong> ${response.name}</p>
            <p><strong>Bio:</strong> ${response.bio}</p>
            <p><strong>Location:</strong> ${response.location}</p>
            <p><strong>Number of public repos:</strong> ${response.public_repos}</p>
        </div>`
    overview.append(userInfo);
};