document.addEventListener('DOMContentLoaded', function () {
  // Hamburger nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navList.classList.toggle('show');
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = "none");
        answer.style.display = "block";
      }
    });
  });

  // Newsletter
  const form = document.getElementById('newsletter');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      if (!email.includes('@') || !name) {
        alert('Please enter your name and a valid email.');
        return;
      }
      alert('Thanks! You are subscribed — we will email you soon.');
      form.reset();
    });
  }
});
