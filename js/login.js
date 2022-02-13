"use strict";
let elForm = document.querySelector(".form");
let elUsernameInput = document.querySelector(".username-input");
let elPasswordInput = document.querySelector(".username-password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const usernameInput = elUsernameInput.value;
  const passwordInput = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameInput,
      password: passwordInput,
    }),
  })
    .then((res) => res.json())
    .then((date) => {
      if (date?.token) {
        window.localStorage.setItem("token", date.token);
        window.location.replace("index.html");
      } else {
        alert("Username va password xato kiritildi");
      }
    });
});
