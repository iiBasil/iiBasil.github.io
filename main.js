/* ======================================
   main.js — باسل الحربي Portfolio
   ====================================== */

/* ===== Year in Footer ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Navbar scroll effect ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===== Burger Menu ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });

/* ===== IntersectionObserver — Reveal on Scroll ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== Skill Bars Animation ===== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width');
      // Small delay for visual effect
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ===== Contact Form ===== */
// const contactForm = document.getElementById('contactForm');
// const formSuccess = document.getElementById('formSuccess');

// if (contactForm) {
//   contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const btn = contactForm.querySelector('button[type="submit"]');
//     const originalText = btn.textContent;
//     btn.textContent = 'جاري الإرسال...';
//     btn.disabled = true;

//     // Simulate async send (replace with real API call / EmailJS etc.)
//     setTimeout(() => {
//       btn.textContent = originalText;
//       btn.disabled = false;
//       contactForm.reset();
//       formSuccess.classList.add('visible');

//       setTimeout(() => {
//         formSuccess.classList.remove('visible');
//       }, 4000);
//     }, 1200);
//   });
// }

/* ===== Smooth scroll for hero arrow & nav links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== Add subtle tilt effect to project cards on hover ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== Badge hover ripple ===== */
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.background = 'rgba(168,85,247,0.22)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.background = '';
  });
});
