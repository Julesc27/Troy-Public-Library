(function () {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach((dd) => {
    const btn = dd.querySelector('[data-dropdown-btn]');
    if (!btn) return;

    const close = () => {
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      dropdowns.forEach((other) => {
        if (other !== dd) {
          other.classList.remove('open');
          const otherBtn = other.querySelector('[data-dropdown-btn]');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      const isOpen = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) close();
    });

    dd.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });

  const searchForms = document.querySelectorAll('[data-search-form]');
  searchForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const q = form.querySelector('[data-search-q]')?.value?.trim() || '';
      const scope = form.querySelector('[data-search-scope]')?.value || 'catalog';

      const KOHA_CATALOG_URL = 'https://catalog.your-koha-domain.example/cgi-bin/koha/opac-search.pl';
      const SITE_SEARCH_URL = 'search-results.html?q=';

      if (!q) {
        alert('Please enter a search term.');
        return;
      }

      if (scope === 'catalog') {
        const url = `${KOHA_CATALOG_URL}?q=${encodeURIComponent(q)}`;
        window.open(url, '_blank', 'noopener');
      } else {
        window.location.href = `${SITE_SEARCH_URL}${encodeURIComponent(q)}`;
      }
    });
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const caption = carousel.querySelector('[data-carousel-caption]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    const slides = [
      {
        title: 'Explore a historic space.',
        text: 'Use a real photo of the building or a major event here so the homepage feels alive immediately.'
      },
      {
        title: 'Discover your next read.',
        text: 'New Books, curated staff lists, and a single featured item make the collections area feel more distinct.'
      },
      {
        title: 'Find what you need fast.',
        text: 'Search, events, digital collections, and Ask a Librarian are all easy to reach from the top of the page.'
      }
    ];

    let idx = 0;

    const render = () => {
      if (!caption) return;
      caption.innerHTML = `<strong>${slides[idx].title}</strong><br><span>${slides[idx].text}</span>`;
    };

    prevBtn?.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      render();
    });

    nextBtn?.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      render();
    });

    render();
  }

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();