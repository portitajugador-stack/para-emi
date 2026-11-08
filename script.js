document.addEventListener("DOMContentLoaded", function () {

  /* ==================================
     ABRIR LAS PUERTAS DE LA INVITACIÓN
  ================================== */

  const openButton = document.getElementById("openDoor");
  const doorScreen = document.getElementById("doorScreen");

  if (openButton && doorScreen) {
    openButton.addEventListener("click", function () {

      if (document.body.classList.contains("door-open")) {
        return;
      }

      document.body.classList.add("door-open");
      openButton.disabled = true;

      setTimeout(function () {
        doorScreen.style.display = "none";
      }, 1800);

    });
  }

  /* ==================================
     CAMBIAR LAS PÁGINAS CON BOTONES
  ================================== */

  const sliderTrack = document.getElementById("sliderTrack");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageNumber = document.getElementById("pageNumber");
  const nextPageButtons = document.querySelectorAll(".next-page");

  let currentPage = 0;
  const totalPages = 4;

  function showPage(page) {

    if (!sliderTrack || !pageNumber) {
      return;
    }

    currentPage = Math.max(0, Math.min(page, totalPages - 1));

    sliderTrack.style.transform =
      "translateX(-" + (currentPage * 25) + "%)";

    pageNumber.textContent =
      (currentPage + 1) + " / " + totalPages;

    if (prevButton) {
      prevButton.disabled = currentPage === 0;
    }

    if (nextButton) {
      nextButton.disabled = currentPage === totalPages - 1;

      nextButton.textContent =
        currentPage === totalPages - 1
          ? "FINALIZAR"
          : "SIGUIENTE";
    }

    /* Regresa al inicio de la página */
    document.querySelectorAll(".page").forEach(function (pageElement) {
      pageElement.scrollTop = 0;
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showPage(currentPage - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showPage(currentPage + 1);
    });
  }

  nextPageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showPage(currentPage + 1);
    });
  });

  showPage(0);

  /* ==================================
     CUENTA REGRESIVA DE LA BODA
  ================================== */

  const weddingDate = new Date(
    "2026-11-14T18:00:00-05:00"
  ).getTime();

  function updateCountdown() {

    const now = Date.now();
    const difference = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement ||
        !minutesElement || !secondsElement) {
      return;
    }

    if (difference <= 0) {
      daysElement.textContent = "0";
      hoursElement.textContent = "0";
      minutesElement.textContent = "0";
      secondsElement.textContent = "0";
      return;
    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

});
