
document.addEventListener("DOMContentLoaded", function () {

  // ABRIR LA PUERTA
  const openDoorButton = document.getElementById("openDoor");
  const doorScreen = document.getElementById("doorScreen");

  if (openDoorButton && doorScreen) {
    openDoorButton.addEventListener("click", function () {
      document.body.classList.add("door-open");
      openDoorButton.disabled = true;

      setTimeout(function () {
        doorScreen.style.display = "none";
      }, 1800);
    });
  }

  // CAMBIAR PÁGINAS CON BOTONES
  const sliderTrack = document.getElementById("sliderTrack");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageNumber = document.getElementById("pageNumber");
  const navButtons = document.querySelectorAll(".nav-button");
  const nextPageButtons = document.querySelectorAll(".next-page");

  let currentPage = 0;
  const totalPages = 4;

  function showPage(page) {
    currentPage = Math.max(0, Math.min(page, totalPages - 1));

    sliderTrack.style.transform =
      "translateX(-" + (currentPage * 25) + "%)";

    pageNumber.textContent =
      (currentPage + 1) + " / " + totalPages;

    navButtons.forEach(function (button) {
      button.classList.toggle(
        "active",
        Number(button.dataset.page) === currentPage
      );
    });

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;

    nextButton.textContent =
      currentPage === totalPages - 1 ? "FINALIZAR" : "SIGUIENTE";
  }

  prevButton.addEventListener("click", function () {
    showPage(currentPage - 1);
  });

  nextButton.addEventListener("click", function () {
    showPage(currentPage + 1);
  });

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showPage(Number(button.dataset.page));
    });
  });

  nextPageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showPage(currentPage + 1);
    });
  });

  showPage(0);

  // CONTADOR REGRESIVO
  const weddingDate =
    new Date("2026-11-14T18:00:00-05:00").getTime();

  function updateCountdown() {
    const difference = weddingDate - Date.now();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (difference <= 0) {
      days.textContent = "0";
      hours.textContent = "0";
      minutes.textContent = "0";
      seconds.textContent = "0";
      return;
    }

    days.textContent = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    hours.textContent = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    minutes.textContent = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    seconds.textContent = Math.floor(
      (difference / 1000) % 60
    );
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // OCULTAR IMÁGENES QUE NO SE HAYAN SUBIDO
  document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("error", function () {
      image.style.display = "none";
    });
  });

});
