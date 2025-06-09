# Web App Specification: Wedding Invitation for Jazmin & Teodosis

## Overview

This is a single-page web application (SPA) for a wedding invitation, designed for mobile-first access, with responsive layout and subtle animations. The site is multilingual (auto-detect), personalized via URL parameters, and includes user interaction elements like RSVP forms and .ics calendar downloads.

---

## Functional Requirements

### General

* Single Page Application (SPA)
* Fully responsive; optimized for mobile viewing
* Language auto-detection (English or Spanish)
* Smooth scroll between sections
* Floating hamburger menu for navigation

### Music

* Background music: "Binks no Sake" (One Piece)
* Auto-plays on load
* Single floating mute/unmute button with speaker icon

### Navbar

* Initially hidden; appears on scroll up or via hamburger icon
* Floating text links with no background
* In mobile: vertical slide-in from the left when opened

### Section 1: Home

* Background image with centered text:

  * "Hola {Nombre}, estás invitada a la boda de"
  * Jazmin & Teodosis (cursive, large font)
* Countdown timer to Sept 21, 2025 at 10:00 AM GMT-6:

  * Format: `100d 12h 03m 02s`
  * Real-time updates
* Button: Add to calendar (.ics file)

  * Title: Boda de Jazmin & Teodosis
  * Description: Link to site
  * Time: 10:30 AM - 5:00 PM GMT-6
  * Location: Finca de eventos Los Higuerones, San Rafael de Heredia

### Section 2: Timeline

* Vertical timeline with alternating side text blocks
* Circular photos (real, bordered) connecting via thin lines
* Events:

  * 2015: Nos conocimos
  * 2017: Empezamos a salir
  * 2019: Nos pasamos a vivir juntos
  * 2020: Adoptamos nuestro primer gato Kathy
  * 2020: Adoptamos a Hestia
  * 2022: Nos comprometimos
  * 2024: Adoptamos nuestro tercer gato Ares
  * 2025: ¡Nos casamos!
* Scroll-triggered slide-in animations (left/right)

### Section 3: Dónde (Where)

* Title: "Dónde"
* Text: Finca de eventos Los Higuerones
* Subtext: San Rafael de Heredia
* Decorative map icon
* Two buttons:

  * Google Maps: [https://maps.app.goo.gl/pfj7ES2vQQxWiFio8](https://maps.app.goo.gl/pfj7ES2vQQxWiFio8)
  * Waze: [https://ul.waze.com/ul?ll=10.02823545%2C-84.10784753\&navigate=yes](https://ul.waze.com/ul?ll=10.02823545%2C-84.10784753&navigate=yes)

### Section 4: Dress Code

* Title: "Código de vestimenta"
* Sub-labels:

  * Formal (tooltip with description)
  * Semiformal (tooltip with description)
* Prohibited Colors:

  * White
  * Beige: `#b5b9b7`
  * Olive green: `#a8b99f`
  * Light blue: `#98a4b0`
* Four color circles with tooltips displaying color name

### Section 5: Confirmar Asistencia (RSVP)

* Button: "Confirmar asistencia" opens a form
* Two cases:

  1. Generic URL:

     * Title: Favor llenar este formulario por cada asistente
     * Fields: Nombre completo, Restricciones alimenticias, Consultas
  2. Personalized URL (`?nombre=Ana`):

     * Title: "Hola Ana, esta invitación es válida para máximo N personas"
     * Fields: Dropdown for number of guests, Restricciones alimenticias, Consultas

### Section 6: Regalos (Gifts)

* Text: “Su presencia en nuestra boda será el mejor regalo...”
* Button: "Transferencias"

  * Opens popup with:

    * 💳 Cuenta IBAN: CR0000000339999
    * 🏦 Cuenta BAC: 398884849
    * 📱 SinpeMóvil: 88172226
  * Popup closable via 'X' or clicking outside

### Section 7: Fotos

* Horizontal image carousel
* Approx. 6 real photos
* Auto-scroll and manual controls

### Section 8: Cierre

* Message: "Gracias por acompañarnos"
* Centered, styled in elegant typography

### Social Sharing

* Optimized meta tags for link previews (especially WhatsApp):

  * Title: Boda de Jazmin y Teodosis
  * Description: “Estás invitado a celebrar con nosotros este día especial”
  * Image: Provided separately

---

## Architecture & Technologies

* HTML5 + CSS3 (separate style.css file)
* JavaScript ES6
* Optionally: React or Vanilla JS with Vite/Webpack
* No server backend or database required
* Optional use of GSAP or AOS for scroll animations

---

## URL Parameters

* `?nombre=` → injects guest name
* Maps to custom section greeting and RSVP personalization
* Guest capacity (`N`) defined manually (e.g., via JSON or JS object)

---

## Error Handling

* Fallback for missing or malformed `nombre` param
* Music autoplay fallback for browser restrictions
* Graceful degradation on unsupported browsers

---

## Testing Plan

### Functional Testing

* [ ] All buttons perform intended actions (scroll, popup, form, etc.)
* [ ] RSVP form conditions switch based on URL
* [ ] Countdown timer is accurate in multiple time zones
* [ ] .ics download works across devices and apps

### Responsiveness

* [ ] Mobile view
* [ ] Tablet view
* [ ] Desktop view

### Language Detection

* [ ] Site displays correctly in English and Spanish
* [ ] Text strings map to correct sections based on browser language

### Accessibility

* [ ] Tab-navigable interface
* [ ] Alt text for images
* [ ] Sufficient color contrast

### Share Preview

* [ ] WhatsApp link preview shows expected title, description, and image

---

## Related Docs

* [docs/images.md](images.md): Guidelines and filenames for images
* [docs/strings.md](strings.md): Text content for both languages
* [docs/guests.json](guests.json): Guest name and capacity map
* [docs/icons.md](icons.md): Icon list and sources
