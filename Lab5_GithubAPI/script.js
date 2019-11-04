const result = document.querySelector("#divResultFetch");
const resultXhr = document.querySelector("#divResultXHR");
const btnRepos = document.querySelector("#btnRepos");
const btnLongPol = document.querySelector("#l-pol");
const btnRecursion = document.querySelector("#rec");
const btnStop = document.querySelector("#stop");
const xhrResponse = document.querySelector("#xhrResponse");
const repoInfo = document.querySelector("#repo-info");
const btnInfo = document.querySelector("#info");
const ul = document.querySelector("#repos");
// increasing ratelimit to 5000 per hour by using client parameter with id and secret at url link
const apiUrl =
  "https://api.github.com/users/fox5ower/repos?client_id=5061b3ada5641276927c&client_secret=50f4431076783688696b67b9f749761b28ced714";

btnRepos.onclick = () => getResponse(apiUrl);
xhrResponse.onclick = () => xhrRes();
btnInfo.onclick = () => fullInfo(apiUrl);
btnLongPol.onclick = () => subscribe(apiUrl);
btnRecursion.onclick = () => recursion();
btnStop.onclick = () => stopRecursion();

//попытка

// let task1 = [];
// const add = arr => {
//   if (arr.length != task1.length) {
//     task1 = arr;
//     arr.forEach(repo => {
//       const option = document.createElement("option");

//       option.appendChild(
//         document.createTextNode(
//           `${repo.name}
//           ${repo.created_at}`
//         )
//       );
//       document.querySelector("select").appendChild(option);
//     });
//   }
// };
result.appendChild(document.createElement("select"));
//fetch, task 1, 2, 3
async function getResponse(url) {
  const response = await fetch(url);
  const apiResult = await response.json();
  apiResult.sort((a, b) => new Date(a.created_at) < new Date(b.created_at));
  // add(apiResult);
  apiResult.forEach(repo => {
    const option = document.createElement("option");

    option.appendChild(
      document.createTextNode(
        `${repo.name}
              ${repo.created_at}`
      )
    );
    document.querySelector("select").appendChild(option);
  });
}

//xhr task 4
function xhrRes() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", apiUrl);

  xhr.onload = () => {
    const repositories = JSON.parse(xhr.response);
    console.log(repositories);

    rep = repositories.sort((a, b) => a.watchers_count < b.watchers_count);

    rep.forEach(repo => {
      resultXhr.appendChild(
        document.createTextNode(`${repo.created_at} ${repo.name}`)
      );
      resultXhr.appendChild(document.createElement("br"));
    });
  };
  xhr.send();
}

// task 5
async function fullInfo(url) {
  const response = await fetch(url);
  const result = await response.json();
  const paragraph = document.createElement("p");

  result.forEach(repo => {
    for (let key in repo) {
      paragraph.appendChild(document.createTextNode(`${key}: ${repo[key]}`));
      paragraph.appendChild(document.createElement("br"));
    }
    console.log(repo);
    paragraph.appendChild(document.createElement("br"));
    paragraph.appendChild(document.createElement("br"));
  });
  repoInfo.appendChild(paragraph);
}

//task 6
const recursion = () => taskTimeOut();
let time;
function taskTimeOut() {
  getResponse(apiUrl);
  xhrRes();
  time = setTimeout(recursion, 2000);
}

function stopRecursion() {
  clearTimeout(time);
}

// async function subscribe(url) {
//   let response = await fetch(url);
//   if (response.status == 502) {
//     await subscribe();
//   } else if (response.status != 200) {
//     console.log(response.statusText);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     await subscribe();
//   } else {
//     let message = await response.json();
//     addRepo(message);
//     await subscribe(url);
//   }
// }

// authorizing function for supertask

// async function authorize() {
//   const userame = "Fox5ower";
//   const password = "1a11A11a11A1";

//   const headers = {
//     Authorization: `Basic ${btoa(`${userame}:${password}`)}`
//   };

//   const url = "https://api.github.com/users/fox5ower/repos";
//   const response = await fetch(url, {
//     method: "GET",
//     headers: headers
//   });

//   const result = await response.json();
//   console.log(result);
// }
