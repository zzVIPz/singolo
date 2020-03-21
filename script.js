window.onload = () => {
  mainNavigationClickHandler();
  changeNavigationLinkOnScroll();
  portfolioTabsClickHandler();
  portfolioSampleClickHandler();
  phonesScreenStateClickHandler();
  changeSlideClickHandler();
  pressBtnSubmitHandler();
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

//change active navigation link on scroll
const anсhors = ["#home", "#services", "#portfolio", "#about", "#contact"];

const changeNavigationLinkOnScroll = () => {
  document.addEventListener("scroll", event => {
    const anсhorsPositions = [];

    anсhors.forEach(el => {
      anсhorsPositions.push(document.querySelector(el).offsetTop - 95);
    });
    anсhorsPositions[0] = 0;

    for (let i = 0; i < anсhorsPositions.length; i++) {
      if (window.scrollY <= anсhorsPositions[i + 1]) {
        const navigationLinkList = mainNavigation.querySelectorAll(
          ".navigation-link"
        );
        navigationLinkList.forEach(el =>
          el.classList.remove("navigation-link-active")
        );
        navigationLinkList[i].classList.add("navigation-link-active");
        break;
      }
    }
  });
};

//change slides on click
const slider = document.querySelector(".slider");
const changeSlideClickHandler = () => {
  slider.addEventListener("click", event => {
    if (event.target.classList.contains("slider-arrow")) {
      if (
        window.getComputedStyle(event.target.parentNode.children[1], null)
          .display === "flex"
      ) {
        event.target.parentNode.children[1].style.display = "none";
        event.target.parentNode.children[2].style.display = "contents";
        event.target.parentNode.style.backgroundColor = "#648BF0";
        event.target.parentNode.style.borderBottom = "6px solid #4e7cf3";
      } else {
        event.target.parentNode.children[1].style.display = "flex";
        event.target.parentNode.children[2].style.display = "none";
        event.target.parentNode.style.backgroundColor = "#f06c64";
        event.target.parentNode.style.borderBottom = "6px solid #ea676b";
      }
    }
  });
};

// on/off screens phone
const slidePhones = document.querySelector(".slide");
const phonesScreenStateClickHandler = () => {
  slidePhones.addEventListener("click", event => {
    if (event.target.classList.contains("screen-vertical"))
      setPhoneScreenState(event.target);
    if (event.target.classList.contains("screen-horizontal"))
      setPhoneScreenState(event.target);
  });
};

const setPhoneScreenState = target => {
  if (
    window.getComputedStyle(target, null).backgroundColor === "rgba(0, 0, 0, 0)"
  ) {
    target.style.backgroundColor = "#000000";
  } else {
    target.style.backgroundColor = "transparent";
  }
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
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//add a border for a selected image
let portfolioSampleSelected = undefined;
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

//modal window
const form = document.querySelector(".form");

// const dataForLetter = getDataForLetter();
// getModalWindow(dataForLetter);
// const btnSubmit = form.querySelector(".input-submit");
const pressBtnSubmitHandler = () => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const dataForLetter = getDataForLetter();
    getModalWindow(dataForLetter);
  });
};

const getDataForLetter = () => {
  let subject = form.querySelector("#subject").value;
  let message = form.querySelector("#message").value;
  return {
    subject,
    message
  };
};

const getModalWindow = dataForLetter => {
  const ModalWindow = document.createDocumentFragment();
  let title = document.createElement("h3");
  title.innerText = "The letter was sent";
  let subject = document.createElement("p");
  subject.innerText = dataForLetter.subject
    ? `Subject: ${dataForLetter.subject}`
    : "Without subject";
  let message = document.createElement("p");
  message.innerText = dataForLetter.subject
    ? `Description: ${dataForLetter.message}`
    : "Without description";

  ModalWindow.appendChild(title, subject, message);
};
