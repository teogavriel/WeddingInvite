let lastScrollTop = 0;
const nav = document.getElementById('main-nav');
const toggleBtn = document.getElementById('menu-toggle');


// Language detection
const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
const i18n = STRINGS[browserLang];

// Replace i18n text in DOM
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (i18n[key]) {
    el.textContent = i18n[key];
  }
});


// Show/hide nav on scroll
window.addEventListener('scroll', () => {
  const current = window.pageYOffset || document.documentElement.scrollTop;

  if (current > lastScrollTop) {
    nav.classList.add('hidden'); // scrolling down
  } else {
    nav.classList.remove('hidden'); // scrolling up
  }
  lastScrollTop = current <= 0 ? 0 : current;
});

// Toggle mobile nav
toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Get elements
const greetingEl = document.getElementById('greeting');
const countdownEl = document.getElementById('countdown');
const calendarBtn = document.getElementById('add-to-calendar');

// Parse URL for 'nombre'
const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get('nombre');

if (nombre) {
  greetingEl.textContent = `Hola ${decodeURIComponent(nombre)}, estás invitada a la boda de`;
}

// Countdown Logic
const eventDate = new Date('2025-09-21T10:00:00-06:00');

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "¡Es hoy!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// .ics Calendar Download
calendarBtn.addEventListener('click', () => {
  const title = 'Boda de Jazmin & Teodosis';
  const description = `¡Gracias por acompañarnos!\nSitio web: ${window.location.href}\nDirección: https://maps.app.goo.gl/wKgLEdw2CsjGVrft7`;
  const location = 'Finca de eventos Los Higuerones, San Rafael de Heredia';
  
  // Date format: YYYYMMDDTHHmmssZ or local (without Z)
  const start = '20250921T103000';
  const end = '20250921T170000';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jazmin y Teodosis//Invitación Boda//ES',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@jazminyteodosis.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=America/Costa_Rica:${start}`,
    `DTEND;TZID=America/Costa_Rica:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'boda-jazmin-teodosis.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

const rsvpToggle = document.getElementById('rsvp-toggle');
const rsvpFormContainer = document.getElementById('rsvp-form-container');

// Simulated guest capacity map
const guestCapacities = {
  "Ana": 2,
  "Carlos": 4,
  "María": 1
};

rsvpToggle.addEventListener('click', () => {
  rsvpFormContainer.classList.toggle('hidden');
  if (!rsvpFormContainer.classList.contains('hidden')) {
    renderRSVPForm();
  }
});

function renderRSVPForm() {
  const nombre = urlParams.get('nombre');
  const decodedName = nombre ? decodeURIComponent(nombre) : null;
  const maxGuests = decodedName && guestCapacities[decodedName] || 0;

  let html = `<form id="rsvp-form">`;

  if (!decodedName) {
    html += `
      <label for="name">Nombre completo:</label>
      <input type="text" id="name" name="name" required>

      <label for="diet">Restricciones alimenticias:</label>
      <textarea id="diet" name="diet" rows="2"></textarea>

      <label for="questions">Consultas:</label>
      <textarea id="questions" name="questions" rows="2"></textarea>
    `;
  } else {
    html += `
      <p><strong>Hola ${decodedName}</strong>, esta invitación es válida para máximo ${maxGuests} persona(s)</p>

      <label for="guests">Cantidad de invitados:</label>
      <select id="guests" name="guests" required>
        ${Array.from({ length: maxGuests }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
      </select>

      <label for="diet">Restricciones alimenticias:</label>
      <textarea id="diet" name="diet" rows="2"></textarea>

      <label for="questions">Consultas:</label>
      <textarea id="questions" name="questions" rows="2"></textarea>
    `;
  }

  html += `<button type="submit">Enviar</button></form>`;
  rsvpFormContainer.innerHTML = html;
}

// Gift modal logic
const giftButton = document.getElementById('gift-button');
const giftModal = document.getElementById('gift-modal');
const closeModal = giftModal.querySelector('.close-modal');

giftButton.addEventListener('click', () => {
  giftModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  giftModal.classList.add('hidden');
});

giftModal.addEventListener('click', (e) => {
  if (e.target === giftModal) {
    giftModal.classList.add('hidden');
  }
});


const track = document.getElementById('carousel-track');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

btnLeft.addEventListener('click', () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
});

// Optional auto-scroll every 5 seconds
setInterval(() => {
  if (document.hidden) return;
  track.scrollBy({ left: 300, behavior: 'smooth' });
}, 5000);
