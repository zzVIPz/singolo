window.onload = () => {
  mainNavigationClickHandler();
  portfolioTabsClickHandler();
  portfolioSampleClickHandler();
};

//interactive main navigation
const mainNavigation = document.querySelector(".navigation");

const mainNavigationClickHandler = () => {
  mainNavigation.addEventListener("click", event => {
    if (event.target.classList.contains("navigation-link"))
      mainNavigation
        .querySelectorAll(".navigation-link")
        .forEach(el => el.classList.remove("navigation-link-active"));
    event.target.classList.add("navigation-link-active");
  });
};

//interactive portfolio tabs
const portfolioTabs = document.querySelector(".portfolio-tags");
const portfolioSamples = document.querySelector(".portfolio-samples");
let portfolioTabsSelected = document.querySelector(".portfolio-link-active");

const portfolioTabsClickHandler = () => {
  portfolioTabs.addEventListener("click", event => {
    if (
      event.target.classList.contains("portfolio-link") &&
      event.target.innerText !== portfolioTabsSelected.innerText
    ) {
      portfolioTabsSelected = event.target;
      portfolioTabs
        .querySelectorAll(".portfolio-link")
        .forEach(el => el.classList.remove("portfolio-link-active"));
      event.target.classList.add("portfolio-link-active");
      const shuffleArray = getShuffleArray([
        ...portfolioSamples.querySelectorAll(".portfolio-item")
      ]);
      portfolioSamples.innerHTML = "";
      const documentFragment = document.createDocumentFragment();
      shuffleArray.forEach(el => documentFragment.appendChild(el));
      portfolioSamples.appendChild(documentFragment);
    }
  });
};

const getShuffleArray = array => {
  console.log(1, typeof array);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//add a border for a selected image
let portfolioSampleSelected = undefined;
console.log("1111", portfolioSampleSelected);
const portfolioSampleClickHandler = () => {
  portfolioSamples.addEventListener("click", event => {
    if (event.target.classList.contains("portfolio-image"))
      portfolioSamples
        .querySelectorAll(".portfolio-image")
        .forEach(el => el.classList.remove("portfolio-image-active"));
    if (event.target.getAttribute("alt") !== portfolioSampleSelected) {
      event.target.classList.add("portfolio-image-active");
      portfolioSampleSelected = event.target.getAttribute("alt");
    } else {
      portfolioSampleSelected = undefined;
    }
  });
};
