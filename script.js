
document.addEventListener("DOMContentLoaded", function () {

  // ELEMENTOS DE LA PUERTA
  const openDoorButton = document.getElementById("openDoor");
  const doorScreen = document.getElementById("doorScreen");

  // ABRIR PUERTA
  if (openDoorButton && doorScreen) {
    openDoorButton.addEventListener("click", function () {
      document.body.classList.add("door-open");

      openDoorButton.disabled = true;
      openDoorButton.textContent = "BIENVENIDOS ♥";

      // Al terminar la animación, retirar la portada
      setTimeout(function () {
        doorScreen.style.display = "none";
      }, 1800);
    });
  }

  // CONTROL DE PÁGINAS
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

    if (sliderTrack) {
      sliderTrack.style.transform =
        "translateX(-" + (currentPage * 25) + "%)";
    }

    if (pageNumber) {
      pageNumber.textContent = (currentPage + 1) + " / " + totalPages;
    }

    navButtons.forEach(function (button) {
      const buttonPage = Number(button.dataset.page);
      button.classList.toggle("active", buttonPage === currentPage);
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

  // DESLIZAR CON EL DEDO O EL RATÓN
  const sliderWindow = document.querySelector(".slider-window");
  let startX = 0;
  let endX = 0;

  if (sliderWindow) {
    sliderWindow.addEventListener("touchstart", function (event) {
      startX = event.changedTouches[0].screenX;
    }, { passive: true });

    sliderWindow.addEventListener("touchend", function (event) {
      endX = event.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    sliderWindow.addEventListener("mousedown", function (event) {
      startX = event.screenX;
    });

    sliderWindow.addEventListener("mouseup", function (event) {
      endX = event.screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const distance = endX - startX;

    if (Math.abs(distance) > 60) {
      if (distance < 0) {
        showPage(currentPage + 1);
      } else {
        showPage(currentPage - 1);
      }
    }
  }

  // CONTADOR REGRESIVO
  const weddingDate = new Date("2026-11-14T18:00:00-05:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const difference = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days || !hours || !minutes || !seconds) return;

    if (difference <= 0) {
      days.textContent = "0";
      hours.textContent = "0";
      minutes.textContent = "0";
      seconds.textContent = "0";
      return;
    }

    days.textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
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

  // OCULTAR ESPACIOS DE FOTOS SI NO SE HAN SUBIDO
  document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("error", function () {
      image.style.display = "none";
    });
  });

});
