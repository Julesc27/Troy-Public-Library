// =========================
// Global navigation behavior
// =========================
(function () {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Dropdowns (keyboard + click)
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('[data-dropdown-btn]');
    const panel = dd.querySelector('[data-dropdown-panel]');
    if (!btn || !panel) return;

    const close = () => {
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) close();
    });

    // Close on Escape
    dd.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });

  // =========================
  // Catalog search (prototype)
  // =========================
  const searchForms = document.querySelectorAll('[data-search-form]');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const q = form.querySelector('[data-search-q]')?.value?.trim() || '';
      const scope = form.querySelector('[data-search-scope]')?.value || 'catalog';

      // Replace these URLs with real Koha endpoints later
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

  // =========================
  // Simple hero carousel
  // =========================
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const caption = carousel.querySelector('[data-carousel-caption]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    const slides = [
      {
        title: 'Explore a historic space.',
        text: 'A clean, welcoming digital front door — reflecting the building’s character and community.',
      },
      {
        title: 'Discover your next read.',
        text: 'New Books, TPL Picks, and Staff Recommendations are featured right on the homepage.',
      },
      {
        title: 'Find programs fast.',
        text: 'Filter events by age group, format (in-person/virtual), and category — with clear registration links.',
      },
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

  // =========================
  // Event filtering (events page)
  // =========================
  const eventFilters = document.querySelector('[data-event-filters]');
  if (eventFilters) {
    const age = eventFilters.querySelector('[data-filter-age]');
    const type = eventFilters.querySelector('[data-filter-type]');
    const query = eventFilters.querySelector('[data-filter-q]');
    const list = document.querySelector('[data-event-list]');

    const apply = () => {
      if (!list) return;
      const ageVal = age?.value || 'all';
      const typeVal = type?.value || 'all';
      const qVal = (query?.value || '').toLowerCase().trim();

      const items = list.querySelectorAll('[data-event]');
      items.forEach(item => {
        const itemAge = item.getAttribute('data-age') || 'all';
        const itemType = item.getAttribute('data-type') || 'all';
        const text = (item.textContent || '').toLowerCase();

        const ageOk = (ageVal === 'all') || (itemAge === ageVal);
        const typeOk = (typeVal === 'all') || (itemType === typeVal);
        const qOk = !qVal || text.includes(qVal);

        item.style.display = (ageOk && typeOk && qOk) ? '' : 'none';
      });
    };

    [age, type, query].forEach(el => el?.addEventListener('input', apply));
    apply();
  }
})();
