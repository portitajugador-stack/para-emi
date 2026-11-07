
const book = document.getElementById("book");

const doors = document.getElementById("doors");

const openBtn = document.getElementById("openBtn");

const backBtn = document.getElementById("backBtn");

const prev = document.getElementById("prev");

const next = document.getElementById("next");

const pageNumber = document.getElementById("pageNumber");


/* CAMBIAR PÁGINA */

function showPage(page) {

  const details = page === 2;

  book.classList.toggle(
    "show-details",
    details
  );

  pageNumber.textContent = details
    ? "2 / 2"
    : "1 / 2";

  prev.disabled = !details;

  next.disabled = details;

}


/* ABRIR PUERTAS */

function openInvitation() {

  if (doors.classList.contains("hidden")) {

    showPage(2);

    return;

  }

  doors.classList.add("open");

  window.setTimeout(() => {

    doors.classList.add("hidden");

    showPage(2);

  }, 1150);

}


/* BOTONES */

openBtn.addEventListener(
  "click",
  openInvitation
);

backBtn.addEventListener(
  "click",
  () => showPage(1)
);

next.addEventListener(
  "click",
  openInvitation
);

prev.addEventListener(
  "click",
  () => showPage(1)
);


/* DESLIZAR EN CELULAR */

let startX = 0;

book.addEventListener(
  "touchstart",
  event => {

    startX = event.changedTouches[0].clientX;

  },
  { passive: true }
);

book.addEventListener(
  "touchend",
  event => {

    const delta =
      event.changedTouches[0].clientX - startX;

    if (Math.abs(delta) > 55) {

      if (
        delta < 0 &&
        !book.classList.contains("show-details")
      ) {

        openInvitation();

      }

      if (delta > 0) {

        showPage(1);

      }

    }

  },
  { passive: true }
);


/* INICIAR */

showPage(1);
