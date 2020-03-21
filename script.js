window.onload = () => {
  OnScrollHandler();
  portfolioTagsClickHandler();
  portfolioSampleClickHandler();
  phonesScreenClickHandler();
  pressBtnSliderClickHandler();
  pressBtnSubmitHandler();
};

//change active navigation link on scroll
const OnScrollHandler = () => {
  document.addEventListener("scroll", event => {
    showAdaptiveMenuOnScroll();
    changeNavigationLinkOnScroll();
  });
};

const changeNavigationLinkOnScroll = () => {
  const navigationLinkList = document.querySelectorAll(".navigation-link");
  const anсhors = ["#home", "#services", "#portfolio", "#about", "#contact"];
  const anсhorsPositions = [];
  anсhors.forEach(el => {
    anсhorsPositions.push(document.querySelector(el).offsetTop - 44);
  });
  for (let i = 0; i < anсhorsPositions.length; i++) {
    if (window.scrollY < anсhorsPositions[i + 1]) {
      navigationLinkList.forEach(el =>
        el.classList.remove("navigation-link-active")
      );
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        navigationLinkList[navigationLinkList.length - 1].classList.add(
          "navigation-link-active"
        );
      } else {
        navigationLinkList[i].classList.add("navigation-link-active");
      }
      break;
    }
  }
};

const showAdaptiveMenuOnScroll = () => {
  const menu = document.querySelector(".header");
  const title = document.querySelector(".logo-title");
  if (window.scrollY) {
    title.classList.add("logo-title-scrolled");
    menu.classList.add("header-scrolled");
  } else {
    menu.classList.remove("header-scrolled");
    title.classList.remove("logo-title-scrolled");
  }
};

// on/off screens phone
const phonesScreenClickHandler = () => {
  const slidePhones = document.querySelector(".slide");
  slidePhones.addEventListener("click", event => {
    if (
      event.target.classList.contains("phone-vertical-display") ||
      event.target.classList.contains("phone-horizontal-display")
    )
      event.target.classList.toggle("phone-display-hide");
  });
};

//change slides on click
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const arrowList = document.querySelectorAll(".slider-arrow");

const pressBtnSliderClickHandler = () => {
  let nextSlideId = undefined;
  slider.addEventListener("click", event => {
    let currentSlideId = getCurrentSlide();
    if (event.target.classList.contains("slider-arrow-prev")) {
      if (currentSlideId) {
        nextSlideId = currentSlideId - 1;
      } else {
        nextSlideId = slides.length - 1;
      }
      showSlide(currentSlideId, nextSlideId, "previous");
    }
    if (event.target.classList.contains("slider-arrow-next")) {
      if (currentSlideId === slides.length - 1) {
        nextSlideId = 0;
      } else {
        nextSlideId = currentSlideId + 1;
      }
      showSlide(currentSlideId, nextSlideId, "next");
    }
  });
};

const getCurrentSlide = () => {
  let currentSlide = [...slides]
    .filter(el => el.classList.contains("slide-active"))[0]
    .getAttribute("id")
    .slice(6);
  return currentSlide - 1;
};

const showSlide = (currentSlideId, nextSlideId, direction) => {
  const currentSlide = document.querySelector(`#slide-${currentSlideId + 1}`);
  const nextSlide = document.querySelector(`#slide-${nextSlideId + 1}`);
  arrowList.forEach(el => el.classList.add("slider-arrow-busy"));
  setTemporaryClass(nextSlide, `slide-${direction}`);
  setTemporaryClass(currentSlide, `slide-${direction}-hide`);
};

const setTemporaryClass = (el, className) => {
  el.classList.add(className);
  el.addEventListener("animationend", function() {
    this.classList.remove(className);
    arrowList.forEach(el => el.classList.remove("slider-arrow-busy"));
  });
  el.classList.toggle("slide-active");
};

//interactive portfolio tabs
const portfolioTags = document.querySelector(".portfolio-tags");
const portfolioSamples = document.querySelector(".portfolio-samples");

const portfolioTagsClickHandler = () => {
  let portfolioTagSelected = document.querySelector(".portfolio-link-active");
  portfolioTags.addEventListener("click", event => {
    if (
      event.target.classList.contains("portfolio-link") &&
      event.target.innerText !== portfolioTagSelected.innerText
    ) {
      portfolioTagSelected = event.target;
      portfolioTags
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
    if (
      event.target.classList.contains("portfolio-image") &&
      event.target.getAttribute("alt") !== portfolioSampleSelected
    ) {
      event.target.classList.add("portfolio-image-active");
      portfolioSampleSelected = event.target.getAttribute("alt");
    } else {
      portfolioSampleSelected = undefined;
    }
  });
};

//modal window
const form = document.querySelector(".form");
const pressBtnSubmitHandler = () => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    showModalWindow();
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

const showModalWindow = () => {
  document.body.appendChild(createModalWindowTemplate());
  pressBtnCloseModalWindow();
};

const setStyleForOverflow = () => {
  document.body.style.overflow = "hidden";
  // document.body.style.width = document.body.offsetWidth + "px";
};

const createModalWindowTemplate = () => {
  const ModalWindowFragment = document.createDocumentFragment();
  const data = getDataForLetter();
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");
  const title = document.createElement("h3");
  title.classList.add("title-modal", "title");
  title.innerText = "The letter was sent";
  const subject = document.createElement("p");
  subject.classList.add("description-subject", "description");
  subject.innerText = data.subject ? `Subject: ${data.subject}` : "No subject";
  const message = document.createElement("p");
  message.classList.add("description-message", "description");
  message.innerText = data.message
    ? `Description: ${data.message}`
    : "No description";
  const btnModalWindow = document.createElement("button");
  btnModalWindow.classList.add("button-modal");
  btnModalWindow.innerText = "OK";
  overlay.appendChild(modalWindow);
  modalWindow.append(title, subject, message, btnModalWindow);
  ModalWindowFragment.appendChild(overlay);
  return ModalWindowFragment;
};

const pressBtnCloseModalWindow = () => {
  const btnModalWindow = document.querySelector(".button-modal");
  btnModalWindow.addEventListener("click", () => {
    const modalWindowTemplate = document.querySelector(".overlay");
    modalWindowTemplate.remove();
    document.body.style.overflow = "auto";
    resetFormByDefault();
  });
};

const resetFormByDefault = () => {
  const form = document.querySelector("#form");
  form.reset();
};
