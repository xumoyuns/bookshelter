"use strict";
let elSearchInput = document.querySelector(".search-input");
let elBookList = document.querySelector(".cards-list");
let elResult = document.querySelector(".result");

let elLogoutBtn = document.querySelector(".logout-btn");
// let elThemeBtn = document.querySelector(".theme-mode");
let elSearchInputValue = elSearchInput.textContent;
const localToken = window.localStorage.getItem("token");
if (!localToken) {
  window.location.replace("login.html");
}
// logout btn

elLogoutBtn.addEventListener("click", function () {
  // if shart yozishni o`ylab ko`rish
  window.localStorage.removeItem("token");

  window.location.replace("login.html");
});

const renderBooks = function (arr, element) {
  element.innerHTML = null;

  arr.forEach((item) => {
    // element.innerHTML = null;
    // console.log("aaaa");
    elResult.textContent = `Showing 18 Result ${arr.totalItem}`;
    const bookCard = `
  <li class="cards-items">
  <div class="card-img-bg">
      <img class="card-img" src="${item.volumeInfo?.imageLinks.thumbnail}" alt="book image">
  </div>

    <h2 class="card-title">${item.volumeInfo?.title}</h2>
    <p class="card-desc">${item.volumeInfo?.authors}</p>
    <p class="book-year">${item.volumeInfo?.publishedDate}</p>
    <div class="buttons">
      <button type="button" data-bookmark="${item.id}" class="bookmark-btn">Bookmark</button>

      <button type="button" data-bookmark="${item.id}" class="more-info-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"">More Info</button>

    <a class="read-btn" href="${item.volumeInfo?.previewLink}" target="_blank">Read</a>
    </div>
    </li>
  `;
    element.insertAdjacentHTML("beforeend", bookCard);
  });
};

// render date from api
const getData = function () {
  let response = fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+${elSearchInputValue}`
  )
    .then((res) => res.json())
    .then((data) => renderBooks(data.items, elBookList));
};

elSearchInput.addEventListener("change", function () {
  elBookList.innerHTML.null;
  getData(elSearchInputValue);
});
