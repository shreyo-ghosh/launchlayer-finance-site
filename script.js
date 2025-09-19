// ==========================
// Basic interactions: mobile nav toggle and newsletter handling
// ==========================
document.addEventListener('DOMContentLoaded', function () {
  // --------------------------
  // Mobile nav toggle
  // --------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navList.classList.toggle('show');
    });
  }

  // --------------------------
  // Newsletter form submission (placeholder)
  // --------------------------
  const form = document.getElementById('newsletter');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value || '';
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email.');
        return;
      }
      // Confirmation (replace with backend integration if needed)
      alert('Thanks! You are subscribed — we will email you soon.');
      form.reset();
    });
  }

  // --------------------------
  // Smooth scroll for anchor links
  // --------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
