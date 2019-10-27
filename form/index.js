const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const thirdName = document.getElementById("thirdName");
const email = document.getElementById("email");

const form = document.getElementById("form");

const green = "#4caf50";
const red = "#f44336";

function validateFirstName() {
  // check if is empty
  if (checkIfEmpty(firstName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}

function validateLastName() {
  // check if is empty
  if (checkIfEmpty(lastName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}

function validateThirdName() {
  // check if is empty
  if (checkIfEmpty(thirdName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(thirdName)) return;
  return true;
}

function validateEmail() {
  // check if is empty
  if (checkIfEmpty(email)) return;
  // is if it has only letters
  if (!checkIfCorrectEmail(email)) return;
  return true;
}

function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `Поле ${field.name} не должно быть пустым`);
    return true;
  } else {
    // set field valid
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

function setValid(field, message) {
  field.className = "valid";
  field.nextElementSibling.innerHTML = "";
  // field.nextElementSibling.style.color = green;
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
