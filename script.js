document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS PRINCIPALES
  const entrance = document.getElementById("entrance");
  const doorFrame = document.querySelector(".door-frame");
  const openDoorButton = document.getElementById("open-door");
  const invitation = document.getElementById("invitation");

  const sliderTrack = document.getElementById("slider-track");
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".nav-btn");

  const previousButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const pageNumber = document.getElementById("page-number");

  let currentPage = 0;
  const totalPages = pages.length;

  // ABRIR LA PUERTA
  openDoorButton.addEventListener("click", () => {

    doorFrame.classList.add("open");

    openDoorButton.disabled = true;

    setTimeout(() => {
      entrance.classList.add("hidden");
      invitation.classList.remove("hidden");

      showPage(0);

    }, 1700);

  });

  // MOSTRAR PÁGINA
  function showPage(index) {

    if (index < 0 || index >= totalPages) {
      return;
    }

    currentPage = index;

    sliderTrack.style.transform =
      `translateX(-${currentPage * 100}%)`;

    // Actualizar navegación
    navButtons.forEach((button, position) => {

      button.classList.toggle(
        "active",
        position === currentPage
      );

    });

    // Actualizar número de página
    pageNumber.textContent =
      `${String(currentPage + 1).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;

    // Actualizar botones
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;

    previousButton.style.opacity =
      currentPage === 0 ? ".4" : "1";

    nextButton.style.opacity =
      currentPage === totalPages - 1 ? ".4" : "1";
  }

  // BOTÓN ANTERIOR
  previousButton.addEventListener("click", () => {
    showPage(currentPage - 1);
  });

  // BOTÓN SIGUIENTE
  nextButton.addEventListener("click", () => {
    showPage(currentPage + 1);
  });

  // BOTONES DE NAVEGACIÓN
  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const page = Number(button.dataset.page);

      showPage(page);

    });

  });

  // BOTONES CONTINUAR
  document.querySelectorAll(".next-page").forEach((button) => {

    button.addEventListener("click", () => {
      showPage(currentPage + 1);
    });

  });

  // DESLIZAR CON EL DEDO EN CELULARES
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderWindow = document.querySelector(".slider-window");

  sliderWindow.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

  }, { passive: true });

  sliderWindow.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

  }, { passive: true });

  function handleSwipe() {

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
      return;
    }

    if (difference > 0) {
      showPage(currentPage + 1);
    } else {
      showPage(currentPage - 1);
    }

  }

  // UBICACIÓN EN GOOGLE MAPS
  const mapButton = document.getElementById("map-button");

  mapButton.addEventListener("click", () => {

    const address =
      "Carrera 16 #5-31, Barrio Buenos Aires, Girardot, Cundinamarca, Colombia";

    const mapUrl =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);

    window.open(mapUrl, "_blank", "noopener,noreferrer");

  });

  // CUENTA REGRESIVA
  // Fecha y hora de Colombia: 14 de noviembre de 2026, 6:00 p. m.
  const weddingDate = new Date("2026-11-14T18:00:00-05:00");

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownMessage = document.getElementById("countdown-message");

  function updateCountdown() {

    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference <= 0) {

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      countdownMessage.textContent =
        "¡Hoy celebramos nuestro amor!";

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

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    countdownMessage.textContent = "¡Te esperamos!";
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // CONFIRMACIÓN DE ASISTENCIA
  const rsvpForm = document.getElementById("rsvp-form");
  const feedback = document.getElementById("form-feedback");

  rsvpForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const nombre =
      document.getElementById("nombre").value.trim();

    const asistencia =
      document.getElementById("asistencia").value;

    const invitados =
      document.getElementById("invitados").value;

    const mensaje =
      document.getElementById("mensaje").value.trim();

    if (!nombre || !asistencia || !invitados) {

      feedback.textContent =
        "Por favor, completa todos los campos obligatorios.";

      return;
    }

    const confirmationMessage =
      `Hola, quiero confirmar mi asistencia a la boda de María y José.\n\n` +
      `Nombre: ${nombre}\n` +
      `Asistencia: ${asistencia}\n` +
      `Número de asistentes: ${invitados}\n` +
      `Mensaje: ${mensaje || "Sin mensaje"}\n\n` +
      `Fecha: 14 de noviembre de 2026\n` +
      `Hora: 6:00 p. m.`;

    const whatsappUrl =
      "https://wa.me/?text=" +
      encodeURIComponent(confirmationMessage);

    feedback.textContent =
      "Se abrirá WhatsApp para que puedas enviar tu confirmación.";

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

  });

  // ESTADO INICIAL
  showPage(0);

});
