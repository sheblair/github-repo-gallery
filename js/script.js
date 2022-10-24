const overview = document.querySelector(".overview");
const username = "sheblair";
const repoList = document.querySelector(".repo-list");

const getProfileInfo = async function () {
    const get = await fetch(`https://api.github.com/users/${username}`);
    const profile = await get.json();
    displayUserInfo(profile);
};

getProfileInfo();

const displayUserInfo = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
        `<figure><img alt="user avatar" src=${profile.avatar_url} /></figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>`
    overview.append(div);
    getRepoInfo();
};

const getRepoInfo = async function () {
    const get = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await get.json();
    console.log(repos);
    displayRepos(repos);
};

const displayRepos = function (repos) {
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}`
        repoList.append(li);
    }
};
