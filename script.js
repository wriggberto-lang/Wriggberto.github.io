// NAVBAR SCROLL
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = '#6c63ff';
      }
    }
  });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .contact-item, .about-grid, .section-header, .qr-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// SKILL BARS ANIMATION
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => { fill.style.width = width + '%'; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// CONTACT FORM (simulado)
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled  = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    btn.style.background = 'linear-gradient(135deg, #00d9a3, #00b87a)';
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      btn.style.background = '';
      btn.disabled  = false;
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1800);
});

// HIGHLIGHT EFFECT ON HERO SUBTITLE
const highlights = document.querySelectorAll('.hero-subtitle .highlight');
highlights.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    el.style.opacity = '1';
  }, 800 + i * 300);
});

// CURSOR GLOW
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});