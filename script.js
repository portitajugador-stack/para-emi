
document.addEventListener("DOMContentLoaded", () => {

  const ANIO_BODA = 2026;
  const TOTAL_PAGINAS = 4;

  const entrada = document.getElementById("entrance");
  const invitacion = document.getElementById("invitation");
  const marcoPuerta = document.querySelector(".door-frame");
  const botonAbrir = document.getElementById("open-door");

  const track = document.getElementById("slider-track");
  const botonesNav = document.querySelectorAll(".nav-btn");
  const botonAnterior = document.getElementById("prev-page");
  const botonSiguiente = document.getElementById("next-page");
  const numeroPagina = document.getElementById("page-number");
  const botonesContinuar = document.querySelectorAll(".next-page");

  let paginaActual = 0;

  // NAVEGACIÓN HORIZONTAL

  function mostrarPagina(numero) {
    paginaActual = Math.max(
      0,
      Math.min(numero, TOTAL_PAGINAS - 1)
    );

    if (track) {
      track.style.transform =
        `translateX(-${paginaActual * 25}%)`;
    }

    botonesNav.forEach((boton, indice) => {
      boton.classList.toggle(
        "active",
        indice === paginaActual
      );
    });

    if (numeroPagina) {
      numeroPagina.textContent =
        `${String(paginaActual + 1).padStart(2, "0")} / 04`;
    }

    if (botonAnterior) {
      botonAnterior.disabled = paginaActual === 0;
      botonAnterior.style.opacity =
        paginaActual === 0 ? ".35" : "1";
    }

    if (botonSiguiente) {
      botonSiguiente.disabled =
        paginaActual === TOTAL_PAGINAS - 1;

      botonSiguiente.style.opacity =
        paginaActual === TOTAL_PAGINAS - 1 ? ".35" : "1";
    }
  }

  // ABRIR LAS PUERTAS

  if (botonAbrir && marcoPuerta && entrada && invitacion) {
    botonAbrir.addEventListener("click", () => {

      marcoPuerta.classList.add("open");
      botonAbrir.disabled = true;

      setTimeout(() => {
        entrada.classList.add("hidden");
        invitacion.classList.remove("hidden");
        mostrarPagina(0);
      }, 1900);

    });
  }

  // BOTONES DEL MENÚ

  botonesNav.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarPagina(Number(boton.dataset.page));
    });
  });

  // BOTÓN ANTERIOR

  if (botonAnterior) {
    botonAnterior.addEventListener("click", () => {
      mostrarPagina(paginaActual - 1);
    });
  }

  // BOTÓN SIGUIENTE

  if (botonSiguiente) {
    botonSiguiente.addEventListener("click", () => {
      mostrarPagina(paginaActual + 1);
    });
  }

  // BOTONES CONTINUAR

  botonesContinuar.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarPagina(paginaActual + 1);
    });
  });

  // CONTADOR REGRESIVO

  const countdownMessage =
    document.getElementById("countdown-message");

  function actualizarCuentaRegresiva() {

    const fechaBoda = new Date(
      `${ANIO_BODA}-11-14T18:00:00-05:00`
    );

    const diferencia = fechaBoda.getTime() - Date.now();

    const elementos = [
      "days",
      "hours",
      "minutes",
      "seconds"
    ];

    if (diferencia <= 0) {

      if (countdownMessage) {
        countdownMessage.textContent =
          "¡Llegó nuestro gran día!";
      }

      elementos.forEach((id) => {
        const elemento = document.getElementById(id);

        if (elemento) {
          elemento.textContent = "00";
        }
      });

      return;
    }

    const valores = [
      Math.floor(diferencia / 86400000),
      Math.floor(diferencia / 3600000) % 24,
      Math.floor(diferencia / 60000) % 60,
      Math.floor(diferencia / 1000) % 60
    ];

    elementos.forEach((id, indice) => {
      const elemento = document.getElementById(id);

      if (elemento) {
        elemento.textContent =
          String(valores[indice]).padStart(2, "0");
      }
    });

    if (countdownMessage) {
      countdownMessage.textContent = "¡Te esperamos!";
    }
  }

  actualizarCuentaRegresiva();
  setInterval(actualizarCuentaRegresiva, 1000);

  // UBICACIÓN EN GOOGLE MAPS

  const botonMapa = document.getElementById("map-button");

  if (botonMapa) {
    botonMapa.addEventListener("click", () => {

      const direccion = encodeURIComponent(
        "Carrera 16 N 5 31, Barrio Buenos Aires, Colombia"
      );

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${direccion}`,
        "_blank",
        "noopener,noreferrer"
      );

    });
  }

  // CONFIRMACIÓN DE ASISTENCIA

  const formulario = document.getElementById("rsvp-form");

  if (formulario) {

    formulario.addEventListener("submit", async (evento) => {

      evento.preventDefault();

      const datos = new FormData(formulario);

      const nombre = String(
        datos.get("nombre") || ""
      ).trim();

      const asistencia = String(
        datos.get("asistencia") || ""
      );

      const invitados = String(
        datos.get("invitados") || ""
      );

      const mensaje = String(
        datos.get("mensaje") || ""
      ).trim();

      const feedback =
        document.getElementById("form-feedback");

      if (!nombre || !asistencia || !invitados) {
        feedback.textContent =
          "Por favor, completa los campos obligatorios.";
        return;
      }

      const texto =
        "CONFIRMACIÓN DE BODA - MARÍA Y JOSÉ\n\n" +
        "Nombre: " + nombre + "\n" +
        "Asistencia: " + asistencia + "\n" +
        "Número de asistentes: " + invitados + "\n" +
        "Mensaje: " + (mensaje || "Sin mensaje");

      try {

        if (navigator.share) {

          await navigator.share({
            title: "Confirmación de asistencia",
            text: texto
          });

          feedback.textContent =
            "¡Gracias! Comparte tu confirmación con los novios.";

        } else if (
          navigator.clipboard &&
          window.isSecureContext
        ) {

          await navigator.clipboard.writeText(texto);

          feedback.textContent =
            "¡Confirmación copiada! Ya puedes enviarla a los novios.";

        } else {

          feedback.textContent =
            "Copia este texto y envíalo a los novios: " + texto;

        }

      } catch (error) {

        if (error.name !== "AbortError") {
          feedback.textContent =
            "No se pudo compartir. Intenta nuevamente.";
        }

      }

    });

  }

  // INICIAR EN LA PRIMERA PÁGINA

  mostrarPagina(0);

});
