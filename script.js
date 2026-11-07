const doorIntro = document.getElementById("doorIntro");
const openDoors = document.getElementById("openDoors");

openDoors.addEventListener("click", () => {
  doorIntro.classList.add("opening");
  window.setTimeout(() => {
    doorIntro.classList.add("gone");
  }, 1850);
});

const pageOne = document.getElementById("pageOne");
const pageTwo = document.getElementById("pageTwo");

document.getElementById("nextButton").addEventListener("click", () => {
  pageOne.classList.remove("active");
  pageTwo.classList.add("active");
  pageOne.setAttribute("aria-hidden", "true");
  pageTwo.setAttribute("aria-hidden", "false");
});

document.getElementById("backButton").addEventListener("click", () => {
  pageTwo.classList.remove("active");
  pageOne.classList.add("active");
  pageTwo.setAttribute("aria-hidden", "true");
  pageOne.setAttribute("aria-hidden", "false");
});
