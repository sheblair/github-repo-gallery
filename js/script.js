const overview = document.querySelector(".overview");
const username = "sheblair";
const repoList = document.querySelector(".repo-list")

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(response);
    displayUserInfo(data);
};
gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
        `<figure><img alt="user avatar" src=${data.avatar_url} /></figure>
        <div>
            <p><strong>name:</strong> ${data.name}</p>
            <p><strong>bio:</strong> ${data.bio}</p>
            <p><strong>location:</strong> ${data.location}</p>
            <p><strong>number of public repos:</strong> ${data.public_repos}</p>
        </div>`
    overview.append(div);
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (let repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}`
        repoList.append(repoItem);
    }
};
