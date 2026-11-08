
const fecha = new Date('2026-11-14T18:00:00-05:00');

const countdownMessage =
document.getElementById('countdown-message');

function actualizarCuentaRegresiva() {

    const diferencia = fecha.getTime() - Date.now();

    if (diferencia <= 0) {

        countdownMessage.textContent = '¡Llegó nuestro gran día!';

        ['days','hours','minutes','seconds'].forEach(id => {
            document.getElementById(id).textContent = '00';
        });

        return;
    }

    const partes = [
        Math.floor(diferencia / 86400000),
        Math.floor(diferencia / 3600000) % 24,
        Math.floor(diferencia / 60000) % 60,
        Math.floor(diferencia / 1000) % 60
    ];

    ['days','hours','minutes','seconds'].forEach((id,i) => {
        document.getElementById(id).textContent =
        String(partes[i]).padStart(2,'0');
    });

    countdownMessage.textContent = '¡Te esperamos!';
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva,1000);


// CONFIRMACION DE ASISTENCIA

document.getElementById('rsvp-form').addEventListener('submit', async e => {

    e.preventDefault();

    const datos = new FormData(e.currentTarget);

    const nombre = String(datos.get('nombre') || '').trim();
    const asistencia = String(datos.get('asistencia') || '');
    const invitados = String(datos.get('invitados') || '');
    const mensaje = String(datos.get('mensaje') || '').trim();

    if (!nombre || !asistencia || !invitados) return;

    const texto =
`Confirmación de boda - María y José

Nombre: ${nombre}
Asistencia: ${asistencia}
Número de asistentes: ${invitados}
Mensaje: ${mensaje || 'Sin mensaje'}`;

    const feedback = document.getElementById('form-feedback');

    try {

        if (navigator.share) {

            await navigator.share({
                title: 'Confirmación de asistencia',
                text: texto
            });

            feedback.textContent =
            'Confirmación preparada. Recuerda enviarla a los novios.';

        } else if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(texto);

            feedback.textContent =
            '¡Texto copiado! Envíalo a los novios por WhatsApp.';

        } else {

            feedback.textContent = texto;

        }

    } catch(error) {

        if (error.name !== 'AbortError') {
            feedback.textContent = texto;
        }

    }

});
