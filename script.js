// CONFIGURACIÓN: cuando confirmen el año, reemplaza null por el año (ej. 2027).
// La hora es 17:00 de Colombia (UTC-5).
const ANIO_BODA = null;
const countdownMessage = document.getElementById('countdown-message');
function actualizarCuentaRegresiva(){
  if(!ANIO_BODA){countdownMessage.textContent='El contador se activará cuando configures el año de la boda en script.js.';return;}
  const fecha = new Date(`${ANIO_BODA}-11-14T17:00:00-05:00`);
  const diferencia=fecha.getTime()-Date.now();
  if(diferencia<=0){countdownMessage.textContent='¡Llegó nuestro gran día!';['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id).textContent='00');return;}
  const partes=[Math.floor(diferencia/86400000),Math.floor(diferencia/3600000)%24,Math.floor(diferencia/60000)%60,Math.floor(diferencia/1000)%60];
  ['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(partes[i]).padStart(2,'0'));
  countdownMessage.textContent='¡Te esperamos!';
}
actualizarCuentaRegresiva();setInterval(actualizarCuentaRegresiva,1000);
// Este formulario NO almacena ni envía información a los novios.
// Genera un texto para compartir mediante las opciones nativas del dispositivo o copiar.
document.getElementById('rsvp-form').addEventListener('submit',async e=>{
  e.preventDefault();const datos=new FormData(e.currentTarget);
  const nombre=String(datos.get('nombre')||'').trim();const asistencia=String(datos.get('asistencia')||'');const invitados=String(datos.get('invitados')||'');const mensaje=String(datos.get('mensaje')||'').trim();
  if(!nombre||!asistencia||!invitados)return;
  const texto=`Confirmación de boda - María y José\nNombre: ${nombre}\nAsistencia: ${asistencia}\nNúmero de asistentes: ${invitados}\nMensaje: ${mensaje||'Sin mensaje'}`;
  const feedback=document.getElementById('form-feedback');
  try{
    if(navigator.share){await navigator.share({title:'Confirmación de asistencia',text:texto});feedback.textContent='Confirmación preparada. Recuerda enviarla a los novios.';}
    else if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(texto);feedback.textContent='¡Texto copiado! Envíalo a los novios por WhatsApp u otro medio.';}
    else{feedback.textContent=texto+' — Copia este mensaje y envíalo a los novios.';}
  }catch(error){if(error.name!=='AbortError')feedback.textContent=texto;}
});
