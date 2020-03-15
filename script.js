window.onload = () => {
  mainNavigationClickHandler();
};

const mainNavigation = document.querySelector(".navigation");
const btnSubmit = document.querySelector(".input-submit");
// const btnClose = document.querySelector(".navigation");

const mainNavigationClickHandler = () => {
  mainNavigation.addEventListener("click", event => {
    if (event.target.classList.contains("navigation-link"))
      mainNavigation
        .querySelectorAll(".navigation-link")
        .forEach(el => el.classList.remove("navigation-link-active"));
    event.target.classList.add("navigation-link-active");
  });
};

btnSubmit.addEventListener("click", event => {});

console.log(mainNavigation);
