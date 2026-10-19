(() => {
  const params = new URLSearchParams(location.search);
  let searchTerm = params.get("search") || "";
  let filterTimer;

  // Reading progress indicator on article pages
  function initReadingProgress() {
    const bar = document.querySelector("#progress-fill");
    if (!bar) return;
    let pending = false;
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0}%`;
      pending = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!pending) {
          window.requestAnimationFrame(update);
          pending = true;
        }
      },
      { passive: true },
    );
    update();
  }

  // Live card search on homepage
  function initSearch() {
    const cards = [...document.querySelectorAll(".post-card")];
    if (cards.length === 0) return;

    const searchInput = document.querySelector("#site-search");

    const syncCards = () => {
      let visibleCount = 0;
      cards.forEach((card) => {
        const matchesSearch =
          !searchTerm ||
          (card.dataset.search && card.dataset.search.includes(searchTerm));
        card.hidden = !matchesSearch;
        if (matchesSearch) visibleCount++;
      });

      const emptyEl = document.querySelector(".empty-state");
      if (visibleCount === 0 && !emptyEl) {
        document
          .querySelector("#post-grid")
          ?.insertAdjacentHTML(
            "beforeend",
            '<p class="empty-state">Nothing found under that search. Try another keyword.</p>',
          );
      } else if (visibleCount > 0 && emptyEl) {
        emptyEl.remove();
      }
    };

    if (searchTerm && searchInput) {
      searchInput.value = searchTerm;
      syncCards();
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        clearTimeout(filterTimer);
        filterTimer = setTimeout(syncCards, 80);
      });
    }
  }

  // Theme toggle
  function initTheme() {
    const button = document.querySelector("#theme-toggle");
    if (!button) return;
    const preference = () => {
      try {
        return localStorage.getItem("theme") || "system";
      } catch {
        return "system";
      }
    };
    const applyTheme = (mode) => {
      const theme =
        mode === "system"
          ? matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : mode;
      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="theme-color"]').content =
        theme === "dark" ? "#171a1c" : "#f7f5ef";
      button.setAttribute(
        "aria-label",
        `Color theme: ${mode}. Activate to change theme`,
      );
      button.setAttribute("aria-pressed", String(theme === "dark"));
    };
    const modes = ["light", "dark", "system"];
    applyTheme(preference());
    button.addEventListener("click", () => {
      const current = preference();
      const next = modes[(modes.indexOf(current) + 1) % modes.length];
      try {
        localStorage.setItem("theme", next);
      } catch {}
      applyTheme(next);
    });
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      () => {
        if (preference() === "system") applyTheme("system");
      },
    );
  }

  // Navigation mobile drawer
  function initNavigation() {
    const menu = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#site-nav");
    if (!menu || !nav) return;
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menu.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        menu.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        menu.focus();
      }
    });
  }

  // Global controls (search redirect from non-home pages, back to top, footer year)
  function initGlobalControls() {
    const yearSpan = document.querySelector("#year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const searchInput = document.querySelector("#site-search");
    const isHomePage = !!document.querySelector("#post-grid");
    if (searchInput && !isHomePage) {
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const val = searchInput.value.trim();
          if (val) {
            location.href = `index.html?search=${encodeURIComponent(val)}#articles`;
          }
        }
      });
    }

    const backTop = document.querySelector("#back-top");
    if (backTop) {
      window.addEventListener(
        "scroll",
        () => backTop.classList.toggle("is-visible", window.scrollY > 400),
        { passive: true },
      );
      backTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    }

    // Contact form handling if present
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = document.querySelector("#contact-status");
        if (!contactForm.reportValidity()) {
          if (status) {
            status.dataset.state = "error";
            status.textContent = "Please fill out all fields before sending.";
          }
          return;
        }
        if (status) {
          status.dataset.state = "success";
          status.textContent =
            "Thanks for reaching out! Your message was received successfully.";
        }
        contactForm.reset();
      });
    }
  }

  initTheme();
  initNavigation();
  initGlobalControls();
  initSearch();
  initReadingProgress();
})();
