const app = document.querySelector("#app");
const api = "https://acme-users-api-rev.herokuapp.com/api";

const renderLinks = (data) => {
  const hash = window.location.hash.slice(1);
  const num = Math.ceil(data / 50);
  const linkBox = document.createElement("div");
  linkBox.classList.add("linkBox");
  for (let i = 0; i < num; i++) {
    const numDiv = document.createElement("div");
    console.log(i, hash);
    if (`${i}` === hash) {
      numDiv.classList.add("selected");
    }
    const numLink = document.createElement("a");
    numLink.innerText = `${i + 1}`;
    numLink.href = `#${i}`;
    numDiv.append(numLink);
    linkBox.append(numDiv);
  }
  app.append(linkBox);
};

const renderUsers = (data) => {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  const first = document.createElement("th");
  first.innerText = "First Name";
  const last = document.createElement("th");
  last.innerText = "Last Name";
  //   const email = document.createElement("th");
  //   email.innerText = "Email";
  //   const title = document.createElement("th");
  //   title.innerText = "Title";

  headerRow.append(first, last);
  table.append(headerRow);
  const users = data
    .map((user, idx) => {
      const userRow = document.createElement("tr");
      const first = document.createElement("td");
      first.innerText = user.firstName;
      const last = document.createElement("td");
      last.innerText = user.lastName;
      // const email = document.createElement("td");
      // const title = document.createElement("td");
      userRow.append(first, last);
      table.append(userRow);
    })
    .join("");

  app.append(table);
};

window.addEventListener("hashchange", (ev) => {
  const id = window.location.hash.slice(1);
  app.innerHTML = "";
  fetch(`https://acme-users-api-rev.herokuapp.com/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      renderLinks(data.count);
      renderUsers(data.users);
    });
});

const getData = () => {
  fetch("https://acme-users-api-rev.herokuapp.com/api/users")
    .then((res) => res.json())
    .then((data) => {
      renderLinks(data.count);
      renderUsers(data.users);
      console.log(data.users);
    });
};

getData();
