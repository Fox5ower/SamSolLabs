const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const thirdName = document.getElementById("thirdName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
const dropArea = document.getElementById("drop-area");
const progress = document.getElementById("progress-bar");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-bg");
const modalItem = document.querySelector("#modal-item");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button");
const submit = document.querySelector("#submit");
const container = document.querySelector("div.container");
const select = document.querySelector("#select");
const travelDate = document.querySelector("#date");

let placeNames = document.querySelectorAll(".placeName");
let places = Array.from(document.querySelectorAll(".place"));
const checks = Array.from(document.querySelectorAll(".check"));
const range = Array.from(document.querySelectorAll(".range"));

const green = "#4caf50";
const red = "#f44336";

const radioContainer = document.querySelector("div.col.s6");
const radios = radioContainer.getElementsByTagName("input");
let temp;

function pickRadio() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      temp = radios[i].value;
      return temp;
    }
  }
}

var tempArr = [];

function pickPlace() {
  for (let i = 0; i < places.length; i++) {
    if (places[i].type === "checkbox" && places[i].checked) {
      tempArr.push(places[i].value);
    }
  }
  return tempArr.toString().replace(/,/g, ", ");
}

const rangeContainer = document.querySelector("div.col.s12.check-range");
const ranges = document.querySelectorAll(".range");

function pickRangeVal() {
  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i].type === "range") {
      temp = ranges[i].value;
      return temp;
    }
  }
}

select.addEventListener("change", event => {
  for (opt of event.target.children) {
    if (opt.selected) {
      console.log(opt.value);
      for (let i = 0; i < places.length; i++) {
        places[i].value = opt.value;
      }
    }
  }

  if (select.options[select.selectedIndex].value == "Италия") {
    placeNames[0].innerText = "Верона";
    placeNames[1].innerText = "Пизанская башня";
    placeNames[2].innerText = "Везувий";
  } else if (select.options[select.selectedIndex].value == "Эстония") {
    placeNames[0].innerText = "Валасте";
    placeNames[1].innerText = "Ягала";
    placeNames[2].innerText = "Замок Лоде";
  } else if (select.options[select.selectedIndex].value == "Беларусь") {
    placeNames[0].innerText = "Гора Лысая";
    placeNames[1].innerText = "Национальная библиотека";
    placeNames[2].innerText = "Гродненский зоопарк";
  }
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validateThirdName() &&
    validateEmail() &&
    validatePhone()
  ) {
    const loader = document.createElement("div");
    const loadingBar = document.createElement("div");
    loader.className = "progress";
    loadingBar.className = "indeterminate";
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    setTimeout(function() {
      const loaderDiv = document.querySelector("div.progress");
      modalItem.appendChild(
        document.createTextNode(`CПАСИБО, ${lastName.value.toUpperCase()} ${firstName.value.toUpperCase()} ${thirdName.value.toUpperCase()}, ВАШ ОТЗЫВ ОТПРАВЛЕН!
        Суммарная информация:
        Контакты: ${phone.value}, ${email.value}.
        Дата поездки: ${travelDate.value}.
        Страна визита: ${select.options[select.selectedIndex].value}.
        Оценка гида: ${pickRangeVal()}.
        Эмоции: ${pickRadio()}.`)
      );
      container.removeChild(loaderDiv);
      modal.style.display = "block";
      modalOverlay.style.display = "block";
      form.reset();
    }, 1000);
  } else {
    modalItem.appendChild(
      document.createTextNode(
        "ДОПУЩЕНА ОШИБКА! При введении данных в одно из полей была допущена ошибка"
      )
    );
    modal.style.display = "block";
    modalOverlay.style.display = "block";
  }
});

function validateFirstName() {
  if (checkIfEmpty(firstName)) return;
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}

function validateLastName() {
  if (checkIfEmpty(lastName)) return;
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}

function validateThirdName() {
  if (checkIfEmpty(thirdName)) return;
  if (!checkIfOnlyLetters(thirdName)) return;
  return true;
}

function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!checkIfCorrectEmail(email)) return;
  return true;
}

function validatePhone() {
  if (checkIfEmpty(phone)) return;
  if (!checkIfCorrectPhone(phone)) return;
  return true;
}

function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(field, `Поле ${field.name} не должно быть пустым`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}

function isEmpty(value) {
  if (value === "") return true;
  return false;
}

function setInvalid(field, message) {
  field.className = "invalid";
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}

function setValid(field) {
  field.className = "valid";
  field.nextElementSibling.innerHTML = "";
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-ZА-Яа-я ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `Поле ${field.name} должно содержать только буквы`);
    return false;
  }
}

function checkIfCorrectEmail(field) {
  if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      field.value
    )
  ) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} введен некорректно`);
    return false;
  }
}

function checkIfCorrectPhone(field) {
  if (
    /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?/.test(
      field.value
    )
  ) {
    setValid(field);
    return true;
  } else {
    setInvalid(
      field,
      `${field.name} введен некорректно, попробуйте +375xxxxxxxxx`
    );
  }
}

function checkToRange() {
  checks.forEach(el =>
    el.checked
      ? range.map(node => {
          node.name === el.name ? node.classList.add("show") : 0;
        })
      : range.map(node => {
          node.name === el.name ? node.classList.remove("show") : 0;
        })
  );
}

// DRAG-N-DROP section, upload on server using cloudinary API
// При загрузке фотографий, они загружаются на сервер https://cloudinary.com/console/media_library/folders/%2Fdrag на мой аккаунт

// Prevent default
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

//Color change
["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea.classList.add("highlight");
}

function unhighlight() {
  dropArea.classList.remove("highlight");
}

function hideProgress() {
  progress.classList.remove("progShow");
}

function showProgress() {
  progress.classList.add("progShow");
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

let uploadProgress = [];
let progressBar = document.getElementById("progress-bar");

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total =
    uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length);
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById("gallery").appendChild(img);
  };
}

function uploadFile(file, i) {
  var url = "https://api.cloudinary.com/v1_1/dkirggnhn/image/upload"; // API upload link
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.upload.addEventListener("progress", function(e) {
    showProgress();
    updateProgress(i, (e.loaded * 100.0) / e.total || 100); // Setting progress bar val
  });

  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100);
      hideProgress();
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      alert("An error occured");
    }
  });

  formData.append("upload_preset", "hpkxi2js"); // API preset name
  formData.append("file", file);
  xhr.send(formData);
}

closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  modalOverlay.style.display = "none";
});
