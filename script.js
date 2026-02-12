document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality (shared across pages)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
      const activeTheme = body.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      // Add a temporary class so CSS can animate the transition
      body.classList.add('theme-transition');

      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);

      // Remove the transition helper class after the animation duration
      setTimeout(() => {
        body.classList.remove('theme-transition');
      }, 400);
    });

    function updateThemeIcon(theme) {
      if (!icon) return;
      icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Mobile navigation toggle (hamburger)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.querySelector('.topnav nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked (useful on mobile)
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Animated Skill Bars (home page only)
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            if (width) {
              progressBar.style.width = width + '%';
            }
            observer.unobserve(progressBar);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }

  // Smooth scrolling for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Contact form demo handler (contact page only)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const message = messageInput?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out your name, email, and message before sending.');
        return;
      }

      const subject = `Portfolio Contact - ${name}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ];

      const mailtoLink = `mailto:ssanskar1223@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open the user's default mail client with the message pre-filled
      window.location.href = mailtoLink;
    });
  }

  // Projects accordion (About page)
  const projectItems = document.querySelectorAll('.project-item');
  if (projectItems.length) {
    projectItems.forEach((item) => {
      const toggle = item.querySelector('.project-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other open items for a cleaner accordion behavior
        projectItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('open');
          }
        });

        item.classList.toggle('open', !isOpen);
      });
    });
  }
});

// Page load fade-in (optional visual polish)
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

