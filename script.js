document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('main-nav');
  
  // ...all your code that uses nav, toggleBtn, etc...

  // Show/hide nav on scroll (DESKTOP)


  let lastScrollY = window.pageYOffset;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    // Desktop: hide nav on scroll down, show on scroll up
    if (window.innerWidth > 768) {
      if (currentScrollY > lastScrollY) {
        nav.classList.add('hide-on-scroll');
      } else {
        nav.classList.remove('hide-on-scroll');
      }
      lastScrollY = currentScrollY;
    } else {
      // Mobile: close menu if open, but don't touch hide-on-scroll
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });

  const audio = document.getElementById('bg-music');
  audio.currentTime += 2;
  const muteBtn = document.getElementById('mute-btn');

  // Start muted for autoplay policy
  audio.muted = true;
  audio.volume = 0.5;

  // Try to play (may be blocked)
  audio.play().catch(() => {});

  // On first user interaction, unmute and play
  function enableAudio() {
    audio.muted = false;
    audio.play();
    muteBtn.textContent = '🔊';
    document.removeEventListener('click', enableAudio);
  }
  document.addEventListener('click', enableAudio);

  // Mute/unmute toggle
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents this click from also triggering enableAudio
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', audio.muted ? 'Unmute audio' : 'Mute audio');
  });

  // Language detection
  const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
  const i18n = STRINGS[browserLang];

  // Replace i18n text in DOM
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[key]) {
      el.textContent = i18n[key];
    }

    // For placeholders
    if (el.hasAttribute('data-i18n-placeholder')) {
      const phKey = el.getAttribute('data-i18n-placeholder');
      if (i18n[phKey]) {
        el.setAttribute('placeholder', i18n[phKey]);
      }
    }
    // For tooltips
    if (el.hasAttribute('data-tooltip')) {
      const tipKey = el.getAttribute('data-i18n-tooltip');
      if (tipKey && i18n[tipKey]) {
        el.setAttribute('data-tooltip', i18n[tipKey]);
      }
    }


  });

  const heroSection = document.getElementById('home');





// Smooth scroll for menu links
document.querySelectorAll('#main-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Optionally close mobile menu
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });
});


const toggleBtn = document.getElementById('menu-toggle');

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
      <label for="fullname" data-i18n="rsvp_fullname">${i18n.rsvp_fullname}</label>
      <input type="text" id="fullname" name="fullname" required>

      <label for="confirm" data-i18n="rsvp_confirm">${i18n.rsvp_confirm}</label>
      <div class="slider-container">
        <label class="switch">
          <input type="checkbox" name="confirmed" id="confirm" value="Sí">
          <span class="slider round"></span>
        </label>
      </div>

      <label for="diet" data-i18n="rsvp_diet">${i18n.rsvp_diet}</label>
      <textarea id="diet" name="diet" rows="2" placeholder="${i18n.rsvp_diet_placeholder}"></textarea>

      <label for="notes" data-i18n="rsvp_notes">${i18n.rsvp_notes}</label>
      <textarea id="notes" name="notes" rows="2"></textarea>

      <button type="submit" data-i18n="rsvp_submit">${i18n.rsvp_submit}</button>
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


function initCollageAutoScroll(carouselSelector, direction = 1, baseSpeed = 0.3, fastSpeed = 2) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;
  let speed = baseSpeed * direction;
  let interval;
  let isPaused = false;
  let lastX = null;
  let isTouching = false;

  function startAutoScroll() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      if (!isPaused && !isTouching) {
        carousel.scrollLeft += speed;
        // Loop if at end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
          carousel.scrollLeft = 0;
        }
        if (carousel.scrollLeft <= 0 && speed < 0) {
          carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
        }
      }
    }, 16); // ~60fps
  }

  // Mouse movement for desktop
  carousel.addEventListener('mousemove', (e) => {
    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;
    if (x < third) {
      speed = -fastSpeed;
      isPaused = false;
    } else if (x > 2 * third) {
      speed = fastSpeed;
      isPaused = false;
    } else {
      isPaused = true;
    }
  });
  carousel.addEventListener('mouseleave', () => {
    speed = baseSpeed * direction;
    isPaused = false;
  });

  // Touch events for mobile
  carousel.addEventListener('touchstart', (e) => {
    isTouching = true;
    lastX = e.touches[0].clientX;
  });
  carousel.addEventListener('touchmove', (e) => {
    if (lastX !== null) {
      const dx = lastX - e.touches[0].clientX;
      carousel.scrollLeft += dx;
      lastX = e.touches[0].clientX;
    }
  });
  carousel.addEventListener('touchend', () => {
    isTouching = false;
    lastX = null;
  });

  startAutoScroll();
}

function enableDragScroll(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2; // scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// Initialize for both carousels (note the selector change!)
initCollageAutoScroll('.horizontal-collage', 1, 0.3, 2);
initCollageAutoScroll('.vertical-collage', 1, 0.3, 2);
enableDragScroll('.horizontal-collage');
enableDragScroll('.vertical-collage');
// On resize, keep the current vertical image centered
//window.addEventListener('resize', () => showVerticalImage(verticalIndex));


  // ...rest of your code...
});