const book = document.getElementById('book');
const doors = document.getElementById('doors');
const openBtn = document.getElementById('openBtn');
const backBtn = document.getElementById('backBtn');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageNumber = document.getElementById('pageNumber');

function showPage(page){
  const details = page === 2;
  book.classList.toggle('show-details', details);
  pageNumber.textContent = details ? '2 / 2' : '1 / 2';
  prev.disabled = !details;
  next.disabled = details;
}
function openInvitation(){
  doors.classList.add('open');
  window.setTimeout(() => {
    doors.classList.add('hidden');
    showPage(2);
  }, 1150);
}
openBtn.addEventListener('click', openInvitation);
backBtn.addEventListener('click', () => showPage(1));
next.addEventListener('click', () => {
  if (!doors.classList.contains('hidden')) openInvitation();
  else showPage(2);
});
prev.addEventListener('click', () => showPage(1));

// Permite deslizar horizontalmente en celular o con el mouse.
let startX = 0;
book.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, {passive:true});
book.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientX - startX;
  if (Math.abs(delta) > 55) {
    if (delta < 0 && !book.classList.contains('show-details')) openInvitation();
    if (delta > 0) showPage(1);
  }
}, {passive:true});
showPage(1);

  // INICIAR EN LA PRIMERA PÁGINA

  mostrarPagina(0);

});
