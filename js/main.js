// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Close mobile nav when a link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Toast notification helper
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Contact form handler
function handleContact(e) {
  e.preventDefault();
  showToast('✅ Thank you! We\'ll be in touch within one business day.');
  e.target.reset();
}

// Newsletter form handler
function handleNewsletter(e) {
  e.preventDefault();
  showToast('🌿 You\'re subscribed! Welcome to the GreenScape community.');
  e.target.reset();
}

// Smooth scroll active nav state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.fontWeight = link.getAttribute('href') === '#' + entry.target.id ? '700' : '';
        link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--green-mid)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Animate stats on scroll
const stats = document.querySelectorAll('.stat-item strong');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(s => statObserver.observe(s));

function animateNumber(el) {
  const raw = el.textContent;
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
  const suffix = raw.replace(/[0-9.]/g, '');
  if (isNaN(num)) return;
  let start = 0;
  const duration = 1600;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (num < 10 ? (eased * num).toFixed(1) : Math.round(eased * num)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Fade-in on scroll for cards
const fadeEls = document.querySelectorAll('.service-card, .blog-card, .testimonial-card, .project-card, .why-item');
fadeEls.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity .5s ease, transform .5s ease'; });

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * (Array.from(entry.target.parentElement.children).indexOf(entry.target)));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));
