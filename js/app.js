(() => {
    const posts = window.TechPulsePosts || [];
    const categories = ['All topics', ...new Set(posts.map((post) => post.category))];
    const page = document.querySelector('#page-content');
    const params = new URLSearchParams(location.search);
    const requestedPost = params.get('post');
    const view = params.get('view') || 'home';
    let activeCategory = 'All topics';
    let searchTerm = '';
    let shownCount = 6;
    let filterTimer;
    let previousFocus;

    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const postUrl = (post) => `?post=${encodeURIComponent(post.id)}`;
    const dateLabel = (date) => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

    function diagram(type, title = '') {
        const shapes = {
            network: '<ellipse class="orbit" cx="150" cy="100" rx="98" ry="53"/><ellipse class="orbit" cx="150" cy="100" rx="50" ry="89" transform="rotate(48 150 100)"/><path class="diagram-line" d="M55 120 112 78l61 46 69-57M81 62l72 38 43 51"/><circle class="node" cx="55" cy="120" r="7"/><circle class="node" cx="112" cy="78" r="8"/><circle class="node" cx="173" cy="124" r="7"/><circle class="node" cx="242" cy="67" r="8"/><circle class="node" cx="81" cy="62" r="5"/><circle class="node" cx="196" cy="151" r="5"/><text x="18" y="191">INPUT</text><text x="218" y="191">OUTPUT</text>',
            scatter: '<path class="diagram-line" d="M42 162h218M52 166V35"/><path class="diagram-line" d="M65 145 94 125l34 8 30-48 37 14 49-65"/><circle class="node" cx="65" cy="145" r="5"/><circle class="node" cx="94" cy="125" r="5"/><circle class="node" cx="128" cy="133" r="5"/><circle class="node" cx="158" cy="85" r="5"/><circle class="node" cx="195" cy="99" r="5"/><circle class="node" cx="244" cy="34" r="5"/><text x="43" y="190">EXAMPLES</text><text x="198" y="190">MODEL</text>',
            cloud: '<path class="diagram-line" d="M92 135H78a28 28 0 0 1-2-56 47 47 0 0 1 90-11 34 34 0 0 1 34 54h-18M103 111h93M112 96l-9 15 9 15M184 96l9 15-9 15"/><rect class="diagram-line" x="112" y="137" width="68" height="30"/><text x="124" y="157">SERVICE</text><text x="28" y="185">REQUEST</text><text x="208" y="185">RESPONSE</text>',
            iot: '<path class="diagram-line" d="M58 100h70m44 0h65M132 78l20 22-20 22M170 78l-20 22 20 22"/><rect class="diagram-line" x="31" y="70" width="28" height="60"/><circle class="diagram-line" cx="45" cy="100" r="6"/><rect class="diagram-line" x="128" y="69" width="44" height="62"/><path class="diagram-line" d="M137 84h26m-26 13h26m-26 13h17"/><rect class="diagram-line" x="237" y="70" width="28" height="60"/><text x="24" y="161">SENSE</text><text x="120" y="161">DEVICE</text><text x="229" y="161">ACT</text>',
            chain: '<rect class="diagram-line" x="31" y="71" width="65" height="58"/><rect class="diagram-line" x="118" y="71" width="65" height="58"/><rect class="diagram-line" x="205" y="71" width="65" height="58"/><path class="diagram-line" d="M96 100h22m65 0h22"/><path class="diagram-line" d="m108 93 10 7-10 7m77-14 10 7-10 7"/><text x="40" y="103">RECORD</text><text x="128" y="103">HASH</text><text x="217" y="103">AGREE</text><text x="30" y="157">ORDERED, SHARED HISTORY</text>',
            shield: '<path class="diagram-line" d="M150 31 223 58v47c0 43-30 70-73 91-43-21-73-48-73-91V58z"/><path class="diagram-line" d="m117 105 22 22 46-49"/><circle class="node" cx="150" cy="31" r="5"/><text x="104" y="173">PREVENT</text><text x="166" y="173">RECOVER</text>',
            data: '<path class="diagram-line" d="M38 58h57v30H38zm0 49h57v30H38zm0 49h57v30H38zM205 58h57v30h-57zm0 49h57v30h-57zm0 49h57v30h-57zM95 73h42v49H95m0 49h42v-49m26-49h42v49h-42m0 49h42v-49"/><circle class="node" cx="150" cy="122" r="9"/><text x="104" y="222">SPLIT → PROCESS → JOIN</text>',
            web: '<circle class="diagram-line" cx="150" cy="103" r="29"/><circle class="diagram-line" cx="66" cy="58" r="20"/><circle class="diagram-line" cx="232" cy="59" r="20"/><circle class="diagram-line" cx="71" cy="161" r="20"/><circle class="diagram-line" cx="228" cy="162" r="20"/><path class="diagram-line" d="m83 67 42 24m50-1 39-22m-88 48-40 34m80-33 42 35M86 58h126M90 161h118"/><circle class="node" cx="150" cy="103" r="6"/><text x="124" y="108">LINK</text><text x="44" y="62">ID</text><text x="216" y="64">DATA</text><text x="51" y="166">PROOF</text><text x="212" y="167">RULES</text>',
            quantum: '<circle class="diagram-line" cx="150" cy="101" r="67"/><ellipse class="diagram-line" cx="150" cy="101" rx="102" ry="35" transform="rotate(-35 150 101)"/><ellipse class="diagram-line" cx="150" cy="101" rx="102" ry="35" transform="rotate(35 150 101)"/><circle class="node" cx="150" cy="34" r="7"/><circle class="node" cx="239" cy="73" r="7"/><circle class="node" cx="150" cy="168" r="7"/><path class="diagram-line" d="M150 101v-67m0 67 89-28"/><text x="121" y="207">STATE / MEASURE</text>',
            generate: '<path class="diagram-line" d="M39 150h221M52 151V43"/><path class="diagram-line" d="M63 135c25-13 27-40 51-35s25 36 49 9 33-55 68-55"/><circle class="node" cx="63" cy="135" r="6"/><circle class="node" cx="114" cy="100" r="6"/><circle class="node" cx="163" cy="109" r="6"/><circle class="node" cx="231" cy="54" r="6"/><path class="diagram-line" d="M231 54v-23m0 23 20 10m-20-10-17 16"/><text x="44" y="182">CONTEXT</text><text x="189" y="182">NEXT OUTPUT</text>'
        };
        return `<svg viewBox="0 0 300 220" role="img" aria-label="${escapeHtml(title || 'A simple diagram illustrating this topic')}">${shapes[type] || shapes.network}</svg>`;
    }

    function postCard(post) {
        return `<article class="post-card" data-post="${escapeHtml(post.id)}" data-category="${escapeHtml(post.category)}" data-search="${escapeHtml(`${post.title} ${post.category} ${post.tags.join(' ')}`.toLowerCase())}"><a class="post-card__art" href="${postUrl(post)}" tabindex="-1" aria-hidden="true" style="--art-bg:${post.tint};--art-ink:${post.ink}">${diagram(post.art, `${post.category} diagram`)}</a><span class="post-card__category">${escapeHtml(post.category)}</span><h3><a href="${postUrl(post)}">${escapeHtml(post.title)}</a></h3><p class="post-card__excerpt">${escapeHtml(post.excerpt)}</p><div class="post-meta"><span>${dateLabel(post.date)}</span><span>${post.readTime} min read</span></div></article>`;
    }

    function sidebar() {
        const counts = categories.slice(1).map((category) => `<li><a href="?view=articles&category=${encodeURIComponent(category)}"><span>${escapeHtml(category)}</span><small>${posts.filter((post) => post.category === category).length}</small></a></li>`).join('');
        const popular = posts.slice(1, 4).map((post) => `<li><a href="${postUrl(post)}">${escapeHtml(post.title)}</a></li>`).join('');
        const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 9).map((tag) => `<a href="?view=articles&search=${encodeURIComponent(tag)}">${escapeHtml(tag)}</a>`).join('');
        return `<aside class="sidebar" aria-label="Blog sidebar"><section class="widget"><h2>A note from the desk</h2><p>TechPulse is an independent reading journal for people who like to understand how things work. Plain language, solid references, room for uncertainty.</p></section><section class="widget"><h2>Browse by topic</h2><ul class="widget__list">${counts}</ul></section><section class="widget"><h2>Worth a read</h2><ul class="widget__list">${popular}</ul></section><section class="widget"><h2>Filed under</h2><div class="tag-list">${tags}</div></section><section class="widget"><h2>Occasional notes</h2><p>A quiet inbox note when a new explainer is published.</p><form class="newsletter" id="newsletter-form" novalidate><label class="sr-only" for="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="you@example.com" required><button class="button" type="submit">Sign me up</button><p class="form-message" id="newsletter-message" aria-live="polite"></p></form></section></aside>`;
    }

    function renderHome(isArticles = false) {
        const featured = posts.find((post) => post.id === 'generative-ai') || posts[0];
        const filterButtons = categories.map((category) => `<button class="filter-chip" type="button" data-filter="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">${escapeHtml(category)}</button>`).join('');
        document.title = isArticles ? 'Articles — TechPulse' : 'TechPulse — technology, made legible';
        document.querySelector('meta[name="description"]').content = isArticles ? 'Browse clear, carefully sourced explainers across ten technology topics.' : 'Clear, carefully sourced introductions to the technology shaping how we build and live.';
        page.innerHTML = `${isArticles ? '' : `<section class="hero" aria-labelledby="hero-title"><div class="hero__copy"><p class="eyebrow">The TechPulse journal · Issue 01</p><h1 id="hero-title">Technology, without the fog.</h1><p class="hero__dek">Thoughtful introductions to the systems shaping our lives. Clear enough to follow, careful enough to trust.</p><div class="hero__meta"><span>Ten field notes</span><span>Sources included</span><span>Read at your pace</span></div><a class="text-link" href="${postUrl(featured)}">Start with: ${escapeHtml(featured.category)} <span aria-hidden="true">→</span></a></div><figure class="hero__art">${diagram('network', 'A hand-drawn diagram connecting inputs, systems and outputs')}<figcaption>FIG. 01 — A SYSTEM, IN CONTEXT</figcaption></figure></section>`}<div class="content-layout"><section class="main-column" aria-labelledby="articles-heading"><div class="section-heading"><div><p class="eyebrow">The library</p><h2 id="articles-heading">${isArticles ? 'All articles' : 'Recent field notes'}</h2></div><p>One clear idea at a time.</p></div><div class="filters" role="group" aria-label="Filter articles by topic">${filterButtons}</div><p class="results-line" id="results-line" aria-live="polite"></p><div class="post-grid" id="post-grid">${posts.map(postCard).join('')}</div><div class="load-more-row"><button class="button button--quiet" id="load-more" type="button">Show more articles</button></div></section>${sidebar()}</div>`;
        document.querySelector(`[data-nav="${isArticles ? 'articles' : 'home'}"]`)?.setAttribute('aria-current', 'page');
        applyFilters();
        const categoryParam = params.get('category');
        const searchParam = params.get('search');
        if (categoryParam && categories.includes(categoryParam)) activeCategory = categoryParam;
        if (searchParam) searchTerm = searchParam.toLowerCase();
        syncFilters();
        bindHomeEvents();
    }

    function syncFilters() {
        const cards = [...document.querySelectorAll('.post-card')];
        let visible = 0;
        cards.forEach((card) => {
            const matchesCategory = activeCategory === 'All topics' || card.dataset.category === activeCategory;
            const matchesSearch = !searchTerm || card.dataset.search.includes(searchTerm);
            const match = matchesCategory && matchesSearch;
            card.hidden = !match || visible >= shownCount;
            if (match) visible++;
        });
        document.querySelectorAll('.filter-chip').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === activeCategory)));
        const matchingCount = cards.filter((card) => (activeCategory === 'All topics' || card.dataset.category === activeCategory) && (!searchTerm || card.dataset.search.includes(searchTerm))).length;
        const shownNow = cards.filter((card) => !card.hidden).length;
        const resultLine = document.querySelector('#results-line');
        if (resultLine) resultLine.textContent = searchTerm || activeCategory !== 'All topics' ? `${matchingCount} ${matchingCount === 1 ? 'article' : 'articles'} found${searchTerm ? ` for “${searchTerm}”` : ''}.` : `${posts.length} articles · ${shownNow} shown`;
        const loadMore = document.querySelector('#load-more');
        if (loadMore) loadMore.hidden = shownNow >= matchingCount;
        if (matchingCount === 0 && !document.querySelector('.empty-state')) document.querySelector('#post-grid')?.insertAdjacentHTML('beforeend', '<p class="empty-state">Nothing filed under that search. Try another word or topic.</p>');
        if (matchingCount > 0) document.querySelector('.empty-state')?.remove();
    }

    function applyFilters() {
        clearTimeout(filterTimer);
        filterTimer = setTimeout(() => { shownCount = 6; syncFilters(); }, 120);
    }

    function bindHomeEvents() {
        document.querySelector('.filters')?.addEventListener('click', (event) => {
            const button = event.target.closest('[data-filter]');
            if (!button) return;
            activeCategory = button.dataset.filter;
            shownCount = 6;
            syncFilters();
        });
        document.querySelector('#load-more')?.addEventListener('click', () => { shownCount += 6; syncFilters(); });
        document.querySelector('#newsletter-form')?.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = document.querySelector('#newsletter-email');
            const message = document.querySelector('#newsletter-message');
            if (!input.checkValidity()) {
                message.dataset.state = 'error';
                message.textContent = 'Enter a valid email address.';
                input.focus();
                return;
            }
            message.dataset.state = 'success';
            message.textContent = 'Thanks. The signup is saved for this demo; no email was sent.';
            input.value = '';
        });
    }

    function renderArticle(post) {
        const sections = post.sections.map(([heading, body]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('');
        const takeaways = post.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        const examples = post.examples.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        const sources = post.sources.map(([title, author, publisher, url]) => `<li>${escapeHtml(author)}. <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>. ${escapeHtml(publisher)}.</li>`).join('');
        const related = posts.filter((item) => item.id !== post.id).slice(0, 2).map((item) => `<a href="${postUrl(item)}">${escapeHtml(item.title)} <span aria-hidden="true">→</span></a>`).join('');
        document.title = `${post.title} — TechPulse`;
        document.querySelector('meta[name="description"]').content = post.excerpt;
        page.innerHTML = `<div class="article-progress" aria-hidden="true"><span id="progress-fill"></span></div><article class="article-view" id="article"><header class="article-head"><p class="eyebrow">${escapeHtml(post.category)} · Field note</p><h1 id="article-title" tabindex="-1">${escapeHtml(post.title)}</h1><p class="hero__dek">${escapeHtml(post.excerpt)}</p><div class="hero__meta"><span>Editorial draft</span><span>${dateLabel(post.date)}</span><span>${post.readTime} min read</span></div></header><figure class="article-art" style="--art-bg:${post.tint};--art-ink:${post.ink}">${diagram(post.art, `${post.category} diagram`)}</figure><div class="article-toolbar"><div class="toolbar-group"><button class="button button--quiet" id="reader-toggle" type="button" aria-pressed="false">Reading mode <span aria-hidden="true">R</span></button><button class="button button--quiet" id="print-article" type="button" aria-label="Print article">Print</button></div><div class="toolbar-group" id="reader-controls" hidden><label class="sr-only" for="reader-size">Text size</label><select class="reader-select" id="reader-size" aria-label="Text size"><option value="16">16 px</option><option value="18" selected>18 px</option><option value="20">20 px</option><option value="22">22 px</option><option value="24">24 px</option></select><label class="sr-only" for="reader-font">Font</label><select class="reader-select" id="reader-font" aria-label="Reading font"><option value="serif">Serif</option><option value="sans">Sans</option></select><label class="sr-only" for="reader-leading">Line spacing</label><select class="reader-select" id="reader-leading" aria-label="Line spacing"><option value="1.5">Compact</option><option value="1.7" selected>Relaxed</option><option value="2">Open</option></select><label class="sr-only" for="reader-tone">Page tone</label><select class="reader-select" id="reader-tone" aria-label="Page tone"><option value="light">Light</option><option value="paper">Paper</option><option value="dark">Dark</option></select><button class="button button--quiet" id="reader-exit" type="button">Exit</button></div><span class="reader-status" id="reader-status" aria-live="polite"></span></div><div class="article-body"><p>${escapeHtml(post.intro)}</p>${sections}<section><h2>Where you might meet it</h2><ul>${examples}</ul></section><aside class="takeaways"><h2>Keep in mind</h2><ul>${takeaways}</ul></aside><section class="sources"><h2>Sources & further reading</h2><ol>${sources}</ol><p>Draft prepared 14 October 2026. Verify references and add the author's real byline and firsthand note before publication.</p></section></div><nav class="related" aria-label="More articles"><div class="section-heading"><h2>Keep reading</h2><a class="text-link" href="?view=articles">All articles <span aria-hidden="true">→</span></a></div><div class="related-grid">${related}</div></nav></article>`;
        document.body.classList.remove('reading-mode');
        document.body.removeAttribute('data-reader-tone');
        document.querySelector('[data-nav="articles"]')?.setAttribute('aria-current', 'page');
        bindReader(post);
        bindReadingProgress();
    }

    function bindReader(post) {
        const toggle = document.querySelector('#reader-toggle');
        const controls = document.querySelector('#reader-controls');
        const status = document.querySelector('#reader-status');
        const heading = document.querySelector('#article-title');
        const getPrefs = () => {
            try { return JSON.parse(localStorage.getItem('readerPrefs') || '{}'); } catch { return {}; }
        };
        const prefs = { size: 18, font: 'serif', leading: '1.7', tone: 'light', ...getPrefs() };
        const ids = { size: '#reader-size', font: '#reader-font', leading: '#reader-leading', tone: '#reader-tone' };
        Object.entries(ids).forEach(([key, selector]) => { const select = document.querySelector(selector); if (select) select.value = String(prefs[key]); });
        const savePrefs = () => {
            const values = Object.fromEntries(Object.entries(ids).map(([key, selector]) => [key, document.querySelector(selector).value]));
            try { localStorage.setItem('readerPrefs', JSON.stringify(values)); } catch { }
            document.documentElement.style.setProperty('--reader-size', `${values.size}px`);
            document.documentElement.style.setProperty('--reader-leading', values.leading);
            document.documentElement.style.setProperty('--reader-font', values.font === 'serif' ? 'var(--serif)' : 'var(--sans)');
            if (document.body.classList.contains('reading-mode')) document.body.dataset.readerTone = values.tone;
        };
        Object.values(ids).forEach((selector) => document.querySelector(selector)?.addEventListener('change', savePrefs));
        savePrefs();
        const enter = () => {
            if (document.body.classList.contains('reading-mode')) return;
            previousFocus = toggle;
            document.body.classList.add('reading-mode');
            document.body.dataset.readerTone = document.querySelector('#reader-tone').value;
            controls.hidden = false;
            toggle.setAttribute('aria-pressed', 'true');
            toggle.textContent = 'Reading mode on';
            status.textContent = `${post.readTime} minutes left to read.`;
            heading.focus();
        };
        const exit = () => {
            if (!document.body.classList.contains('reading-mode')) return;
            document.body.classList.remove('reading-mode');
            document.body.removeAttribute('data-reader-tone');
            controls.hidden = true;
            toggle.setAttribute('aria-pressed', 'false');
            toggle.innerHTML = 'Reading mode <span aria-hidden="true">R</span>';
            status.textContent = 'Reading mode off.';
            (previousFocus || toggle).focus();
        };
        toggle.addEventListener('click', () => document.body.classList.contains('reading-mode') ? exit() : enter());
        document.querySelector('#reader-exit').addEventListener('click', exit);
        document.querySelector('#print-article').addEventListener('click', () => window.print());
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && document.body.classList.contains('reading-mode')) exit();
            if (event.key.toLowerCase() === 'r' && !event.ctrlKey && !event.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
                event.preventDefault();
                document.body.classList.contains('reading-mode') ? exit() : enter();
            }
        });
    }

    function bindReadingProgress() {
        const bar = document.querySelector('#progress-fill');
        let pending = false;
        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = `${scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0}%`;
            pending = false;
        };
        window.addEventListener('scroll', () => {
            if (!pending) { window.requestAnimationFrame(update); pending = true; }
        }, { passive: true });
        update();
    }

    function renderSimple(which) {
        const about = which === 'about';
        document.title = `${about ? 'About' : 'Contact'} — TechPulse`;
        document.querySelector('meta[name="description"]').content = about ? 'How the TechPulse technology journal approaches explainers, sources and uncertainty.' : 'Send TechPulse a correction, question or reference suggestion.';
        page.innerHTML = about ? `<section class="simple-page"><p class="eyebrow">College project · About</p><h1>Curiosity, with the sources attached.</h1><p>TechPulse is a college project developed by Nikitaben Prakashbhai Patel. It introduces technology topics in clear language and points readers toward sources for further study.</p><h2>How we work</h2><p>Each explainer starts with a clear question, uses primary documentation where possible and links to further reading. The goal is to make complex ideas easier to understand without presenting uncertain claims as facts.</p><h2>What we cover</h2><p>Artificial intelligence, machine learning, cloud computing, connected devices, distributed ledgers, security, data systems, web standards, quantum computing and generative models.</p></section>` : `<section class="simple-page"><p class="eyebrow">Get in touch</p><h1>Corrections, questions, good references.</h1><p>Found a detail that needs checking, or have a suggestion for a future explainer? Send a note. This demo form validates in your browser and does not transmit or store a message.</p><form class="contact-form" id="contact-form" novalidate><label for="contact-name">Your name<input id="contact-name" name="name" autocomplete="name" required></label><label for="contact-email">Email address<input id="contact-email" name="email" type="email" autocomplete="email" required></label><label for="contact-message">Message<textarea id="contact-message" name="message" minlength="10" required></textarea></label><button class="button" type="submit">Send message</button><p class="form-message" id="contact-status" aria-live="polite"></p></form></section>`;
        document.querySelector(`[data-nav="${which}"]`)?.setAttribute('aria-current', 'page');
        document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const status = document.querySelector('#contact-status');
            if (!form.reportValidity()) { status.dataset.state = 'error'; status.textContent = 'Check the fields above and try again.'; return; }
            status.dataset.state = 'success';
            status.textContent = 'Thanks for the note. This demo does not send messages, so nothing has been transmitted.';
            form.reset();
        });
    }

    function initTheme() {
        const button = document.querySelector('#theme-toggle');
        const preference = () => {
            try { return localStorage.getItem('theme') || 'system'; } catch { return 'system'; }
        };
        const applyTheme = (mode) => {
            const theme = mode === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
            document.documentElement.dataset.theme = theme;
            document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171a1c' : '#f7f5ef';
            button.setAttribute('aria-label', `Color theme: ${mode}. Activate to change theme`);
            button.setAttribute('aria-pressed', String(theme === 'dark'));
        };
        const modes = ['light', 'dark', 'system'];
        applyTheme(preference());
        button.addEventListener('click', () => {
            const current = preference();
            const next = modes[(modes.indexOf(current) + 1) % modes.length];
            try { localStorage.setItem('theme', next); } catch { }
            applyTheme(next);
        });
        matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (preference() === 'system') applyTheme('system');
        });
    }

    function initNavigation() {
        const menu = document.querySelector('#menu-toggle');
        const nav = document.querySelector('#site-nav');
        menu.addEventListener('click', () => {
            const open = menu.getAttribute('aria-expanded') !== 'true';
            menu.setAttribute('aria-expanded', String(open));
            menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
            nav.classList.toggle('is-open', open);
        });
        nav.addEventListener('click', (event) => {
            if (event.target.closest('a')) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); menu.focus(); }
        });
    }

    function initGlobalControls() {
        document.querySelector('#year').textContent = new Date().getFullYear();
        const search = document.querySelector('#site-search');
        search.value = params.get('search') || '';
        search.addEventListener('input', () => {
            searchTerm = search.value.trim().toLowerCase();
            if (!requestedPost && (view === 'home' || view === 'articles')) applyFilters();
            else if (searchTerm) location.href = `?view=articles&search=${encodeURIComponent(searchTerm)}`;
        });
        const backTop = document.querySelector('#back-top');
        window.addEventListener('scroll', () => backTop.classList.toggle('is-visible', window.scrollY > 400), { passive: true });
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    initTheme();
    initNavigation();
    initGlobalControls();
    if (requestedPost) {
        const post = posts.find((item) => item.id === requestedPost);
        if (post) renderArticle(post);
        else {
            page.innerHTML = '<section class="simple-page"><p class="eyebrow">Not found</p><h1>This article is not in the journal.</h1><p><a class="text-link" href="index.html">Return to the journal →</a></p></section>';
            document.title = 'Not found — TechPulse';
        }
    } else if (view === 'about' || view === 'contact') renderSimple(view);
    else renderHome(view === 'articles');
})();