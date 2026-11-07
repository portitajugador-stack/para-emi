// ========================================
// INVITACIÓN DE BODA - MARÍA Y JOSÉ
// ========================================

const ANIO_BODA = 2026;
const TOTAL_PAGINAS = 4;

const entrada = document.getElementById("entrance");
const invitacion = document.getElementById("invitation");
const marcoPuerta = document.querySelector(".door-frame");
const botonAbrir = document.getElementById("open-door");

// ========================================
// ABRIR LA PUERTA
// ========================================

botonAbrir.addEventListener("click", () => {
  marcoPuerta.classList.add("open");
  botonAbrir.disabled = true;

  setTimeout(() => {
    entrada.classList.add("hidden");
    invitacion.classList.remove("hidden");
    mostrarPagina(0);
  }, 1900);
});

// ========================================
// DESLIZAMIENTO DE PÁGINAS
// ========================================

const track = document.getElementById("slider-track");
const botonesNav = document.querySelectorAll(".nav-btn");
const botonAnterior = document.getElementById("prev-page");
const botonSiguiente = document.getElementById("next-page");
const numeroPagina = document.getElementById("page-number");
const botonesContinuar = document.querySelectorAll(".next-page");

let paginaActual = 0;

function mostrarPagina(numero) {
  paginaActual = Math.max(
    0,
    Math.min(numero, TOTAL_PAGINAS - 1)
  );

  track.style.transform = `translateX(-${paginaActual * 25}%)`;

  botonesNav.forEach((boton, indice) => {
    boton.classList.toggle("active", indice === paginaActual);
  });

  numeroPagina.textContent =
    `${String(paginaActual + 1).padStart(2, "0")} / ${TOTAL_PAGINAS}`;

  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled = paginaActual === TOTAL_PAGINAS - 1;

  botonAnterior.style.opacity = paginaActual === 0 ? ".35" : "1";
  botonSiguiente.style.opacity =
    paginaActual === TOTAL_PAGINAS - 1 ? ".35" : "1";
}

botonesNav.forEach((boton) => {
  boton.addEventListener("click", () => {
    mostrarPagina(Number(boton.dataset.page));
  });
});

botonAnterior.addEventListener("click", () => {
  mostrarPagina(paginaActual - 1);
});

botonSiguiente.addEventListener("click", () => {
  mostrarPagina(paginaActual + 1);
});

botonesContinuar.forEach((boton) => {
  boton.addEventListener("click", () => {
    mostrarPagina(paginaActual + 1);
  });
});

// ========================================
// CONTADOR REGRESIVO
// ========================================

const countdownMessage =
  document.getElementById("countdown-message");

function actualizarCuentaRegresiva() {
  const fecha = new Date(
    `${ANIO_BODA}-11-14T18:00:00-05:00`
  );

  const diferencia = fecha.getTime() - Date.now();

  if (diferencia <= 0) {
    countdownMessage.textContent = "¡Llegó nuestro gran día!";

    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.getElementById(id).textContent = "00";
    });

    return;
  }

  const partes = [
    Math.floor(diferencia / 86400000),
    Math.floor(diferencia / 3600000) % 24,
    Math.floor(diferencia / 60000) % 60,
    Math.floor(diferencia / 1000) % 60
  ];

  ["days", "hours", "minutes", "seconds"].forEach((id, indice) => {
    document.getElementById(id).textContent =
      String(partes[indice]).padStart(2, "0");
  });

  countdownMessage.textContent = "¡Te esperamos!";
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

// ========================================
// UBICACIÓN
// ========================================

document.getElementById("map-button").addEventListener("click", () => {
  const direccion = encodeURIComponent(
    "Carrera 16 N 5 31, Barrio Buenos Aires"
  );

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${direccion}`,
    "_blank",
    "noopener,noreferrer"
  );
});

// ========================================
// CONFIRMACIÓN DE ASISTENCIA
// ========================================

const formulario = document.getElementById("rsvp-form");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);

  const nombre = String(datos.get("nombre") || "").trim();
  const asistencia = String(datos.get("asistencia") || "");
  const invitados = String(datos.get("invitados") || "");
  const mensaje = String(datos.get("mensaje") || "").trim();

  const feedback = document.getElementById("form-feedback");

  if (!nombre || !asistencia || !invitados) {
    feedback.textContent = "Por favor, completa los campos obligatorios.";
    return;
  }

  const texto =
    `Confirmación de boda - María y José\n` +
    `Nombre: ${nombre}\n` +
    `Asistencia: ${asistencia}\n` +
    `Número de asistentes: ${invitados}\n` +
    `Mensaje: ${mensaje || "Sin mensaje"}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Confirmación de asistencia",
        text: texto
      });

      feedback.textContent =
        "¡Gracias! Recuerda enviar la confirmación a los novios.";

    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);

      feedback.textContent =
        "¡Confirmación copiada! Ya puedes enviarla a los novios.";

    } else {
      feedback.textContent =
        "No se pudo compartir automáticamente. " + texto;
    }

  } catch (error) {
    if (error.name !== "AbortError") {
      feedback.textContent =
        "No se pudo compartir. Intenta nuevamente.";
    }
  }
});

// ========================================
// INICIAR EN LA PRIMERA PÁGINA
// ========================================

mostrarPagina(0);
