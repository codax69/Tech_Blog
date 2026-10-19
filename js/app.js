(() => {
  const posts = window.TechPulsePosts || [];
  const categories = [
    "All topics",
    ...new Set(posts.map((post) => post.category)),
  ];
  const page = document.querySelector("#page-content");
  const params = new URLSearchParams(location.search);
  const requestedPost = params.get("post");
  const view = params.get("view") || "home";
  let activeCategory = "All topics";
  let searchTerm = "";
  let shownCount = 6;
  let filterTimer;

  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );

  const postUrl = (post) => `?post=${encodeURIComponent(post.id)}`;

  const dateLabel = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00`));

  function postCard(post) {
    return `<article class="post-card" data-post="${escapeHtml(post.id)}" data-category="${escapeHtml(post.category)}" data-search="${escapeHtml(`${post.title} ${post.category} ${post.tags.join(" ")}`.toLowerCase())}">
      <a class="post-card__thumb-link" href="${postUrl(post)}" tabindex="-1" aria-hidden="true">
        <img class="post-card__thumb" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy">
      </a>
      <div class="post-card__content">
        <span class="post-card__category">${escapeHtml(post.category)}</span>
        <h3><a href="${postUrl(post)}">${escapeHtml(post.title)}</a></h3>
        <p class="post-card__excerpt">${escapeHtml(post.excerpt)}</p>
        <div class="post-meta">
          <span>${dateLabel(post.date)}</span>
          <span>${post.readTime} min read</span>
        </div>
      </div>
    </article>`;
  }

  function renderHome(isArticles = false) {
    const featured =
      posts.find((post) => post.id === "generative-ai") || posts[0];
    const filterButtons = categories
      .map(
        (category) =>
          `<button class="filter-chip" type="button" data-filter="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">${escapeHtml(category)}</button>`,
      )
      .join("");

    document.title = isArticles
      ? "Articles — TechPulse"
      : "TechPulse — Technology, Made Legible";
    document.querySelector('meta[name="description"]').content = isArticles
      ? "Browse clear, thoughtful explainers across key modern technologies."
      : "Deep-dives and honest thoughts on technology shaping how we live and build.";

    page.innerHTML = `
      ${
        isArticles
          ? ""
          : `<section class="hero" aria-labelledby="hero-title">
              <div class="hero__copy">
                <p class="eyebrow">TechPulse Journal</p>
                <h1 id="hero-title">Demystifying the tech shaping our future.</h1>
                <p class="hero__dek">Clear, thoughtful explainers written by humans for humans. No buzzword fog, just practical insight into how modern systems actually work.</p>
                <div class="hero__meta">
                  <span>10 Deep Dives</span>
                  <span>Real-world Insights</span>
                  <span>Curated Resources</span>
                </div>
                <a class="text-link" href="${postUrl(featured)}">Featured read: ${escapeHtml(featured.title)} <span aria-hidden="true">→</span></a>
              </div>
              <figure class="hero__image-wrap">
                <img class="hero__image" src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" alt="Modern computer motherboard and circuits" loading="eager">
                <figcaption>Exploring the architecture behind modern digital systems</figcaption>
              </figure>
            </section>`
      }
      <section class="main-column" aria-labelledby="articles-heading">
        <div class="section-heading">
          <div>
            <h2 id="articles-heading">${isArticles ? "All Articles" : "Explore Articles"}</h2>
          </div>
          <p>Curated guides on modern tech topics.</p>
        </div>
        <div class="filters" role="group" aria-label="Filter articles by topic">${filterButtons}</div>
        <p class="results-line" id="results-line" aria-live="polite"></p>
        <div class="post-grid" id="post-grid">${posts.map(postCard).join("")}</div>
        <div class="load-more-row"><button class="button button--quiet" id="load-more" type="button">Show more articles</button></div>
      </section>`;

    document
      .querySelector(`[data-nav="${isArticles ? "articles" : "home"}"]`)
      ?.setAttribute("aria-current", "page");

    applyFilters();
    const categoryParam = params.get("category");
    const searchParam = params.get("search");
    if (categoryParam && categories.includes(categoryParam))
      activeCategory = categoryParam;
    if (searchParam) searchTerm = searchParam.toLowerCase();
    syncFilters();
    bindHomeEvents();
  }

  function syncFilters() {
    const cards = [...document.querySelectorAll(".post-card")];
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory =
        activeCategory === "All topics" ||
        card.dataset.category === activeCategory;
      const matchesSearch =
        !searchTerm || card.dataset.search.includes(searchTerm);
      const match = matchesCategory && matchesSearch;
      card.hidden = !match || visible >= shownCount;
      if (match) visible++;
    });

    document
      .querySelectorAll(".filter-chip")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === activeCategory),
        ),
      );

    const matchingCount = cards.filter(
      (card) =>
        (activeCategory === "All topics" ||
          card.dataset.category === activeCategory) &&
        (!searchTerm || card.dataset.search.includes(searchTerm)),
    ).length;

    const shownNow = cards.filter((card) => !card.hidden).length;
    const resultLine = document.querySelector("#results-line");
    if (resultLine)
      resultLine.textContent =
        searchTerm || activeCategory !== "All topics"
          ? `${matchingCount} ${matchingCount === 1 ? "article" : "articles"} found${searchTerm ? ` for “${searchTerm}”` : ""}.`
          : `${posts.length} articles · ${shownNow} shown`;

    const loadMore = document.querySelector("#load-more");
    if (loadMore) loadMore.hidden = shownNow >= matchingCount;

    if (matchingCount === 0 && !document.querySelector(".empty-state"))
      document
        .querySelector("#post-grid")
        ?.insertAdjacentHTML(
          "beforeend",
          '<p class="empty-state">Nothing found under that search. Try another keyword or topic.</p>',
        );
    if (matchingCount > 0) document.querySelector(".empty-state")?.remove();
  }

  function applyFilters() {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      shownCount = 6;
      syncFilters();
    }, 120);
  }

  function bindHomeEvents() {
    document.querySelector(".filters")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeCategory = button.dataset.filter;
      shownCount = 6;
      syncFilters();
    });

    document.querySelector("#load-more")?.addEventListener("click", () => {
      shownCount += 6;
      syncFilters();
    });
  }

  function renderArticle(post) {
    const sections = post.sections
      .map(
        ([heading, body]) =>
          `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`,
      )
      .join("");
    const takeaways = post.takeaways
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    const examples = post.examples
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    const sources = post.sources
      .map(
        ([title, author, publisher, url]) =>
          `<li>${escapeHtml(author)}. <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>. ${escapeHtml(publisher)}.</li>`,
      )
      .join("");
    const related = posts
      .filter((item) => item.id !== post.id)
      .slice(0, 2)
      .map(
        (item) =>
          `<a href="${postUrl(item)}">${escapeHtml(item.title)} <span aria-hidden="true">→</span></a>`,
      )
      .join("");

    document.title = `${post.title} — TechPulse`;
    document.querySelector('meta[name="description"]').content = post.excerpt;

    page.innerHTML = `
      <div class="article-progress" aria-hidden="true"><span id="progress-fill"></span></div>
      <article class="article-view" id="article">
        <div class="article-toolbar">
          <a class="button button--quiet" href="index.html">← Back to Articles</a>
          <button class="button button--quiet" id="print-article" type="button" aria-label="Print article">Print Article</button>
        </div>
        <header class="article-head">
          <p class="eyebrow">${escapeHtml(post.category)}</p>
          <h1 id="article-title" tabindex="-1">${escapeHtml(post.title)}</h1>
          <p class="hero__dek">${escapeHtml(post.excerpt)}</p>
          <div class="hero__meta">
            <span>By Nikita Patel</span>
            <span>${dateLabel(post.date)}</span>
            <span>${post.readTime} min read</span>
          </div>
        </header>
        <figure class="article-hero-wrap">
          <img class="article-hero-image" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">
        </figure>
        <div class="article-body">
          <p>${escapeHtml(post.intro)}</p>
          ${sections}
          <section>
            <h2>Real-World Examples</h2>
            <ul>${examples}</ul>
          </section>
          <aside class="takeaways">
            <h2>Key Takeaways</h2>
            <ul>${takeaways}</ul>
          </aside>
          <section class="sources">
            <h2>Recommended References</h2>
            <ol>${sources}</ol>
          </section>
        </div>
        <nav class="related" aria-label="More articles">
          <div class="section-heading">
            <h2>Keep reading</h2>
            <a class="text-link" href="?view=articles">All articles <span aria-hidden="true">→</span></a>
          </div>
          <div class="related-grid">${related}</div>
        </nav>
      </article>`;

    document
      .querySelector('[data-nav="articles"]')
      ?.setAttribute("aria-current", "page");

    document
      .querySelector("#print-article")
      ?.addEventListener("click", () => window.print());

    bindReadingProgress();
  }

  function bindReadingProgress() {
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

  function renderSimple(which) {
    const about = which === "about";
    document.title = `${about ? "About" : "Contact"} — TechPulse`;
    document.querySelector('meta[name="description"]').content = about
      ? "About TechPulse: clear, grounded technology explainers written by Nikita Patel."
      : "Send TechPulse a question, feedback, or reference suggestion.";

    page.innerHTML = about
      ? `<section class="simple-page">
          <p class="eyebrow">About TechPulse</p>
          <h1>Curiosity, demystified in plain English.</h1>
          <p>Hi, I'm Nikita Patel — welcome to TechPulse! I built this blog as an honest, easy-to-read space for anyone curious about how modern tech works beneath the marketing buzz.</p>
          <h2>How I write each article</h2>
          <p>Each guide starts with a fundamental question, strips away artificial acronyms, uses real-world examples, and links directly to reputable academic papers or official standards. The goal is to make complex ideas crystal clear without making false promises.</p>
          <h2>Core topics covered</h2>
          <p>Artificial Intelligence, Machine Learning, Cloud Architecture, Internet of Things, Blockchain & Consensus, Cybersecurity, Big Data Systems, Web3 & Identity, Quantum Computing, and Generative AI.</p>
        </section>`
      : `<section class="simple-page">
          <p class="eyebrow">Get in touch</p>
          <h1>Feedback, questions, and conversations.</h1>
          <p>Found a typo, have a suggestion for an explainer, or just want to discuss a topic? Drop a note below. I'd love to hear from you!</p>
          <form class="contact-form" id="contact-form" novalidate>
            <label for="contact-name">Your name
              <input id="contact-name" name="name" autocomplete="name" required>
            </label>
            <label for="contact-email">Email address
              <input id="contact-email" name="email" type="email" autocomplete="email" required>
            </label>
            <label for="contact-message">Message
              <textarea id="contact-message" name="message" minlength="10" required></textarea>
            </label>
            <button class="button" type="submit">Send message</button>
            <p class="form-message" id="contact-status" aria-live="polite"></p>
          </form>
        </section>`;

    document
      .querySelector(`[data-nav="${which}"]`)
      ?.setAttribute("aria-current", "page");

    document
      .querySelector("#contact-form")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const status = document.querySelector("#contact-status");
        if (!form.reportValidity()) {
          status.dataset.state = "error";
          status.textContent = "Please fill out all fields before sending.";
          return;
        }
        status.dataset.state = "success";
        status.textContent =
          "Thanks for reaching out! Your message was received successfully.";
        form.reset();
      });
  }

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

  function initGlobalControls() {
    const yearSpan = document.querySelector("#year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const search = document.querySelector("#site-search");
    if (search) {
      search.value = params.get("search") || "";
      search.addEventListener("input", () => {
        searchTerm = search.value.trim().toLowerCase();
        if (!requestedPost && (view === "home" || view === "articles"))
          applyFilters();
        else if (searchTerm)
          location.href = `?view=articles&search=${encodeURIComponent(searchTerm)}`;
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
  }

  initTheme();
  initNavigation();
  initGlobalControls();

  if (requestedPost) {
    const post = posts.find((item) => item.id === requestedPost);
    if (post) renderArticle(post);
    else {
      page.innerHTML =
        '<section class="simple-page"><p class="eyebrow">Not found</p><h1>Article not found.</h1><p><a class="text-link" href="index.html">← Return to all articles</a></p></section>';
      document.title = "Not found — TechPulse";
    }
  } else if (view === "about" || view === "contact") {
    renderSimple(view);
  } else {
    renderHome(view === "articles");
  }
})();
