const overview = document.querySelector(".overview");
const username = "sheblair";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector("button");
const filterInput = document.querySelector(".filter-repos");

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
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}`
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepo(repoName);
    }
});

const getSpecificRepo = async function (repoName) {
    const get = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await get.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];

    for (let language in languageData) {
        languages.push(language);
    };

    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!<a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    userInput = e.target.value;
    const allRepos = document.querySelectorAll(".repo");
    const searchValue = userInput.toLowerCase();
    for (let repo of allRepos) {
        const repoTitle = repo.innerText.toLowerCase();

        if (repoTitle.includes(searchValue)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});