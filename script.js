const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // RESUME VIEW MODAL
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const closeResumeModal = document.getElementById('closeResumeModal');

  function openResumeModal() {
    if (!resumeModalOverlay) return;
    resumeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModalFn() {
    if (!resumeModalOverlay) return;
    resumeModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModal) closeResumeModal.addEventListener('click', closeResumeModalFn);
  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeResumeModalFn();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResumeModalFn();
  });

/* Sidebar mobile toggle and smooth-scroll navigation */
(() => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mobileMenuToggle');
  const navLinks = Array.from(document.querySelectorAll('.sidebar-nav a'));

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      toggle.firstChild.textContent = isOpen ? '✕ ' : '☰ ';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.firstChild.textContent = '☰ ';
      }
    });
  });

  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const filterButtons = document.querySelectorAll('.work-filter');
  const workCards = document.querySelectorAll('.work-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle('active', item === button));
      workCards.forEach(card => {
        card.hidden = !(filter === 'all' || card.dataset.category === filter);
      });
    });
  });
})();
