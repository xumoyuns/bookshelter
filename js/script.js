"use strict";
let elSearchInput = document.querySelector(".search-input");
let elBookList = document.querySelector(".cards-list");
let elResult = document.querySelector(".result");
let elBookmarkList = document.querySelector(".bookmar-list");

let elLogoutBtn = document.querySelector(".logout-btn");
let elPaginationList = document.querySelector(".pagination-numbers");
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
let elSortBtn = document.querySelector(".sort-btn");
let elModal = document.querySelector(".modal-box");
let page = 1;
let bookmarkId = 0;
let orederByNewest = "&";
let bookmark = [];
let data;

// let elThemeBtn = document.querySelector(".theme-mode");
let elSearchInputValue = "Animals";
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

    const bookCard = `
  <li class="cards-items">
  <div class="card-img-bg">
      <img class="card-img" src="${item.volumeInfo?.imageLinks.thumbnail}" alt="book image">
  </div>
  <div class="card-text-wrapper">


    <h2 class="card-title">${item.volumeInfo?.title}</h2>
    <p class="card-desc">${item.volumeInfo?.authors}</p>
    <p class="book-year">${item.volumeInfo?.publishedDate}</p>
    </div>
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

const getData = async function () {
  let startIndex = (page - 1) * 10 + 1;

  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${elSearchInputValue}&startIndex=${startIndex}${orederByNewest}`
  );

  data = await response.json();
  elResult.textContent = `Showing 18 Result ${data.totalItems}`;

  renderBooks(data.items, elBookList);

  page === 1 ? (elPrevBtn.disabled = true) : (elPrevBtn.disabled = false);

  const totalPageResult = Math.ceil(data.totalItems / 10);
  //   console.log(totalPageResult);

  page === totalPageResult
    ? (elNextBtn.disabled = true)
    : (elNextBtn.disabled = false);

  elPaginationList.innerHTML = null;
  for (let i = 1; i <= totalPageResult; i++) {
    let htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;

    if (page == i) {
      htmlLi = `
      <li class="page-item page-link active">${i}</li>
    `;
    } else {
      htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;
    }

    elPaginationList.insertAdjacentHTML("beforeend", htmlLi);
  }
};

getData();

// function error() {
//   let error = `Afsus!!! Server bog'liq muammao bor`;
//   elBookList.insertAdjacentHTML("beforeend", error);
//   //   console.log("AAA");
// }
// const getData = function () {
//   let startIndex = (1 - 1) * 15 + 1;
//   let response = fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${elSearchInput.value}&${startIndex}`
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data.totalItems));
// }; //renderBooks(data.items, elBookList)

elSearchInput.addEventListener("change", function () {
  elBookList.innerHTML = null;
  elSearchInputValue = elSearchInput.value;
  page = 1;
  getData();
});

elPrevBtn.addEventListener("click", () => {
  page--;
  getData();
});

elNextBtn.addEventListener("click", () => {
  page++;
  getData();
});

elPaginationList.addEventListener("click", function (evt) {
  page = Number(evt.target.textContent);
  getData();
});
// //// BOOKMARK  ////

// elBookList.addEventListener("click", function (evt) {
//   if (evt.target.matches(".bookmark-btn")) {
//     bookmarkId = evt.target.dataset.bookmarkbtn;
//     console.log(bookmarkId);
//     bookMarkPush(data);
//   }
// });

// const bookMarkPush = function (data) {
//   let books = data.items;
//   if (bookmarkId) {
//     if (!bookmarkBooks.find((book) => book.id == books[bookmarkId].id)) {
//       bookmarkBooks.push(books[bookmarkId]);
//       window.localStorage.setItem(
//         "localBookmark",
//         JSON.stringify(bookmarkBooks)
//       );
//     }
//   }

//   bookmarkBooks =
//     JSON.parse(window.localStorage.getItem("localBookmark")) || [];
//   renderBookmark(bookmarkBooks, elBookmark);
// };

// //// render bookmark ////

// function renderBookmark(books, element) {
//   if (books.length > 0 || bookmarkBooks != null) {
//     element.innerHTML = null;
//     let author;
//     let counter = 0;
//     books.forEach((book) => {
//       if (book.volumeInfo.authors == undefined) {
//         author = "Muallif keltirilmagan !";
//       } else {
//         author = book.volumeInfo.authors;
//       }

//       const htmlbook = `<li class="bookmark-items">
//         <div class="bookmark-top">
//           <h2 class="bookmark-heading">${book.volumeInfo.title}</h2>
//           <p class="bookmark-desc">${author}</p>
//         </div>
//         <div class="bookmark-bottom">
//           <a class="read-bookmark-btn" href="${book.volumeInfo.previewLink}" >
//             <img data-bookmarkreadid="${counter}" src="./img/book-open.svg" alt="book icon" />
//           </a>
//           <button class="delete-btn" >
//             <img  data-bookmarkdeleteid="${counter}" class="bookmark__delete-icon" src="./img/delete.svg" alt="delete-icon" />
//           </button>
//         </div>
//       </li>`;
//       counter++;
//       element.insertAdjacentHTML("beforeend", htmlbook);
//     });
//   }
// }

// order by newest
elSortBtn.addEventListener("click", function () {
  orederByNewest = "&";
  orederByNewest += "orderBy=newest";
  getData();
});
// let infoId;

// /////// modal render///////
// elBookList.addEventListener("click", function (evt) {
//   //   console.log(evt.target.matches(".more-info-btn"));
//   if (evt.target.matches(".more-info-btn")) {
//     infoId = evt.target.dataset.infobtn;
//     renderModal(data, elModal);
//   }
// });
// function renderModal(data, element) {
//   element.innerHTML = null;

//   let bookInfo = data.items[infoId];
//   //   console.log(bookInfo);
//   let description;
//   let author;
//   let year;
//   let publisher;
//   let categorie;
//   let pageCount;

//   //// DESCRIPTION ////

//   if (bookInfo.volumeInfo.description == undefined) {
//     description = "Uzur ma'lumot yo'q";
//   } else {
//     description = bookInfo.volumeInfo.description;
//   }

//   //// YEAR ////
//   if (bookInfo.volumeInfo.publishedDate == undefined) {
//     year = "Uzur ma'lumot yo'q";
//   } else {
//     year = bookInfo.volumeInfo.publishedDate;
//   }

//   //// AUTHOR ////

//   if (bookInfo.volumeInfo.authors == undefined) {
//     author = "Jon Doe";
//   } else {
//     author = bookInfo.volumeInfo.authors[0];
//   }

//   //// PUBLISHERS ////

//   if (bookInfo.volumeInfo.publisher == undefined) {
//     publisher = "Uzur ma'lumot yo'q";
//   } else {
//     publisher = bookInfo.volumeInfo.publisher;
//   }

//   //// CATEGORIES ////

//   if (bookInfo.volumeInfo.categories == undefined) {
//     categorie = "Uzur ma'lumot yo'q";
//   } else {
//     categorie = bookInfo.volumeInfo.categories[0];
//   }

//   //// PAGE COUNT ////

//   if (bookInfo.volumeInfo.pageCount == undefined) {
//     pageCount = "Uzur ma'lumot yo'q";
//   } else {
//     pageCount = bookInfo.volumeInfo.pageCount;
//   }
//   let htmlInfoCard = `<div class="offcanvas-header">
//     <h5 class="canvas__name" id="offcanvasRightLabel">${bookInfo.volumeInfo.title}</h5>
//     <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//   </div>
//   <div class="offcanvas-body">
//     <img class="canvas__img" src="${bookInfo.volumeInfo.imageLinks?.smallThumbnail}" alt="photo" >
//     <p class="canvas__desc">${description}</p>
//   </div>
//   <ul class="canvas__list">
//     <li class="canvas__item">Author : <p class="canvas__item-book">${author}</p></li>
//      <li class="canvas__item">Published : <p class="canvas__item-book">${year}</p></li>
//     <li class="canvas__item">Publishers: <p class="canvas__item-book">${publisher}</p></li>
//     <li class="canvas__item">Categories:<p class="canvas__item-book">${categorie}</p></li>
//     <li class="canvas__item">Pages Count:<p class="canvas__item-book">${pageCount}</p></li>
//   </ul>
//   <div class="canvas__footer"><a href="${bookInfo.volumeInfo.previewLink}" class="canvas__read-btn">Read</a></div>`;
//   element.insertAdjacentHTML("beforeend", htmlInfoCard);
// }
