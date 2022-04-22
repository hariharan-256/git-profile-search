"use strict";
const ApiUrl = `https://api.github.com/users/`;

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const serachFilter = document.querySelector('#SearchInput');

// git user details api get
async function getUsers(username) {
    try {
        const { data } = await axios(`${ApiUrl}${username}`);
        // console.log(data);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard("No Profile with this username");
        }
    }
}
// git repos api get
async function getRepos(username) {
    try {
        const { data } = await axios(`${ApiUrl}${username}/repos?sort=created`);
        // console.log(data);
        addReposToCard(data);
    }
    catch (err) {
        createErrorCard("Problem fetching repos");
    }
}
// display user details card
const createUserCard = (user) => {
    const userId = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}` : "";

    const userCardHTML = `
    <div class="user-card">
        <div><img class="user-avatar" src="${user.avatar_url}" alt="${user.name}" /></div>
        <div class="user-info">
            <h2>${userId}</h2>
            ${userBio}
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `;
    main.innerHTML = userCardHTML;
}
// error message function
const createErrorCard = (msg) => {
    const userCardHTML = `
        <div class="user-card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = userCardHTML;
}
// add repos card
const addReposToCard = (repos) => {
    console.log(repos);
    const reposEl = document.querySelector('#repos');

    repos.slice(0, 5).map((repo) => {
        console.log(repo, 'hari');
        const repoEL = document.createElement('a');
        // console.log(repoEL);
        repoEL.classList.add('user-repo');
        repoEL.href = repo.html_url;
        repoEL.target = "_blank";
        repoEL.innerText = repo.name;

        reposEl.appendChild(repoEL);
        // console.log(reposEl);
    });
}

// searched value getting
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = serachFilter.value;
    // console.log(user);
    if (user) {
        getUsers(user);
        serachFilter.value = "";
    }
});



