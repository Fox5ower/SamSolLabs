const name = document.querySelector("#name");
const email = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", function() {
  let savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    savedFormData = JSON.parse(savedFormData);
    name.value = savedFormData.name;
    email.value = savedFormData.email;
    localStorage.removeItem("formData");
  }

  window.addEventListener("beforeunload", e => {
    if (name.value.length || email.value.length) {
      let formData = {
        name: name.value,
        email: email.value
      };
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  });
});
