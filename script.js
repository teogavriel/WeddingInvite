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

const heroSection = document.getElementById('home');

window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  const heroHeight = heroSection.offsetHeight;
  if (window.scrollY > heroHeight - 60) { // 60px buffer for nav height
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
// Show/hide nav on scroll

// Show/hide nav on scroll SOLO en desktop
window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 80) {
      nav.classList.add('hide-on-scroll');
    } else {
      nav.classList.remove('hide-on-scroll');
    }
    lastScrollTop = st <= 0 ? 0 : st;
  } else {
    nav.classList.remove('hide-on-scroll');
  }
});

// Toggle mobile nav
toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Cierra el menú móvil al hacer clic fuera del menú o al hacer scroll hacia abajo
if (window.matchMedia("(max-width: 768px)").matches) {
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      e.target !== toggleBtn
    ) {
      nav.classList.remove('active');
    }
  });

  window.addEventListener('scroll', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
}

// Close mobile menu when link is clicked
document.querySelectorAll('#main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
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


window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  const bg = new Image();
  bg.src = 'assets/images/hero-full.jpg';
  bg.onload = () => {
    hero.classList.add('loaded');
  };
});


setInterval(updateCountdown, 1000);
updateCountdown();


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
  const formAction = "https://formspree.io/f/xeokzwoq"; // <-- replace with your real Formspree endpoint

  const html = `
    <form id="rsvp-form" action="${formAction}" method="POST">
      <label for="fullname">Nombre completo:</label>
      <input type="text" id="fullname" name="fullname" required>

      <label for="confirm">Confirmo mi participación:</label>
      <div class="slider-container">
        <label class="switch">
          <input type="checkbox" name="confirmed" id="confirm" value="Sí">
          <span class="slider round"></span>
        </label>
      </div>

      <label for="diet">Restricciones alimenticias:</label>
      <textarea id="diet" name="diet" rows="2" placeholder="Ej. sin gluten, vegetariano, etc."></textarea>

      <label for="notes">Notas o consultas:</label>
      <textarea id="notes" name="notes" rows="2"></textarea>

      <button type="submit">Enviar</button>
    </form>
  `;

  rsvpFormContainer.innerHTML = html;
}

// Gift modal logic
const giftButton = document.getElementById('gift-button');
const giftModal = document.getElementById('gift-modal');
const closeModal = giftModal.querySelector('.close-modal');

// Copy account number to clipboard on click
document.querySelectorAll('.copy-account').forEach(el => {
  el.addEventListener('click', () => {
    const text = el.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      el.classList.add('copied');
      el.title = "¡Copiado!";
      setTimeout(() => {
        el.classList.remove('copied');
        el.title = "";
      }, 1200);
    });
  });
  // Optional: allow keyboard copy (accessibility)
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      el.click();
    }
  });
});

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
const images = track.querySelectorAll('img');
let currentIndex = 0;

function showImage(index) {
  // Ensure index is within bounds (loop)
  if (index < 0) {
    currentIndex = images.length - 1;
  } else if (index >= images.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  const imgWidth = images[0].clientWidth;
  track.scrollTo({ left: currentIndex * imgWidth, behavior: 'smooth' });
}

btnLeft.addEventListener('click', () => showImage(currentIndex - 1));
btnRight.addEventListener('click', () => showImage(currentIndex + 1));

// Optional: auto-scroll, now infinite
setInterval(() => {
  if (document.hidden) return;
  showImage(currentIndex + 1);
}, 5000);

// On resize, keep the current image centered
window.addEventListener('resize', () => showImage(currentIndex));

// Initialize position
showImage(0);

if (!window.AOS) {
  document.body.classList.add('no-aos');
}


const verticalTrack = document.getElementById('vertical-carousel-track');
const verticalBtnLeft = document.querySelector('.vertical-carousel .carousel-btn.left');
const verticalBtnRight = document.querySelector('.vertical-carousel .carousel-btn.right');
const verticalImages = verticalTrack.querySelectorAll('img');
let verticalIndex = 0;

function showVerticalImage(index) {
  // Number of images visible at once
  const visible = 2;
  const maxIndex = verticalImages.length - visible;
  if (index < 0) {
    verticalIndex = maxIndex >= 0 ? maxIndex : 0;
  } else if (index > maxIndex) {
    verticalIndex = 0;
  } else {
    verticalIndex = index;
  }
  const imgWidth = verticalImages[0].clientWidth;
  verticalTrack.scrollTo({ left: verticalIndex * imgWidth, behavior: 'smooth' });
}

verticalBtnLeft.addEventListener('click', () => showVerticalImage(verticalIndex - 1));
verticalBtnRight.addEventListener('click', () => showVerticalImage(verticalIndex + 1));

// Optional: auto-scroll for vertical carousel
setInterval(() => {
  if (document.hidden) return;
  showVerticalImage(verticalIndex + 1);
}, 6000);

// On resize, keep the current vertical image centered
window.addEventListener('resize', () => showVerticalImage(verticalIndex));

// Initialize position
showVerticalImage(0);

