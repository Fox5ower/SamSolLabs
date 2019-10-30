const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const thirdName = document.getElementById("thirdName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
let check1 = document.getElementById("check1");
let range1 = document.getElementById("range1");
let check2 = document.getElementById("check2");
let range2 = document.getElementById("range2");
let dropArea = document.getElementById("drop-area");

const green = "#4caf50";
const red = "#f44336";

var guide;

var radioContainer = document.querySelector("div.col.s6");
var radios = radioContainer.getElementsByTagName("input");
var temp;

function pickRadio() {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      temp = radios[i].value;
      return temp;
    }
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validateThirdName() &&
    validateEmail()
  ) {
    const container = document.querySelector("div.container");
    const loader = document.createElement("div");
    loader.className = "progress";
    const loadingBar = document.createElement("div");
    loadingBar.className = "indeterminate";
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    setTimeout(function() {
      const loaderDiv = document.querySelector("div.progress");
      const panel = document.createElement("div");
      panel.className = "card-panel popUp";
      const text = document.createElement("span");
      text.appendChild(
        document.createTextNode(
          `CПАСИБО, ${lastName.value.toUpperCase()} ${firstName.value.toUpperCase()} ${thirdName.value.toUpperCase()}, ВАШ ОТЗЫВ ОТПРАВЛЕН!
        Суммарная информация
        Контакты: ${phone.value}, ${email.value}
        Даты поездки:
        Страна визита:
        Посещенные достопримечательности:
        Оценка гида: ${pickRadio()}
        Эмоции: `
        )
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);
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
  if (check1.checked && !check2.checked) {
    range1.style.display = "inline-block";
    check2.disabled = true;
  } else if (!check1.checked && check2.checked) {
    range1.style.display = "none";
    range2.style.display = "inline-block";
    check1.disabled = true;
  } else if (!check1.checked && !check2.checked) {
    range1.style.display = "none";
    range2.style.display = "none";
    check1.disabled = false;
    check2.disabled = false;
  }
}

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

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("active");
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
  console.debug("update", fileNumber, percent, total);
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
  var url = "https://api.cloudinary.com/v1_1/dkirggnhn/image/upload";
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0) / e.total || 100);
  });

  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      alert("An error occured");
    }
  });

  formData.append("upload_preset", "hpkxi2js");
  formData.append("file", file);
  xhr.send(formData);
}

// function openModal() {
//   var modal = document.getElementById("zatemnenie");
//   if (isEmail() === false || isPhone() === false) {
//     modal.style.display = "block";
//   }
// }
// function closeModal() {
//   var modalClose = document.getElementById("close");
//   var modal = document.getElementById("zatemnenie");
//   modalClose.onclick = function() {
//     modal.style.display = "none";
//   };
// }

// function show() {
//   var langCheck = document.getElementById("langHome");
//   var langCheckVisit = document.getElementById("langVisit");
//   var range1 = document.getElementById("range1");
//   var range2 = document.getElementById("range2");
//   if (langCheck.checked) {
//     range1.style.display = "block";
//   } else {
//     range1.style.display = "none";
//   }
//   if (langCheckVisit.checked) {
//     range2.style.display = "block";
//   } else {
//     range2.style.display = "none";
//   }
// }
