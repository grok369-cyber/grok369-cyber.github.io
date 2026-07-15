/* ============================================================
   SAVIO ACADEMY — app.js
   The local database engine, routing, and admin workspace.
   Everything persists in the browser via localStorage — no
   server, no build step. Namespaces used:
     - savio_blogs     : array of blog post objects
     - savio_gallery   : array of gallery image objects
     - savio_messages  : array of admissions inquiry objects
     - savio_theme     : "dark" | "light"
   ============================================================ */

const ADMIN_PASSCODE = "SavioAdmin2026";

/* ------------------------------------------------------------
   0. THEME ENGINE
   Reads/writes the "savio_theme" key so the choice persists
   across pages and reloads. Defaults to dark mode.
------------------------------------------------------------- */
function initTheme() {
  const saved = localStorage.getItem("savio_theme") || "dark";
  applyTheme(saved);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.contains("light");
      applyTheme(isLight ? "dark" : "light");
    });
  }
}

function applyTheme(mode) {
  document.documentElement.classList.toggle("light", mode === "light");
  localStorage.setItem("savio_theme", mode);
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");
  if (sun && moon) {
    sun.classList.toggle("hidden", mode !== "light");
    moon.classList.toggle("hidden", mode === "light");
  }
}

/* ------------------------------------------------------------
   1. MOBILE MENU
------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("open"));
  // Close the mobile menu after any nav link inside it is tapped
  menu.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", () => menu.classList.remove("open"));
  });
}

/* ------------------------------------------------------------
   2. TAB ROUTING (index.html only)
   Every element with [data-tab] (in the header, hero CTA, etc.)
   switches the matching #tab-<name> panel into view.
------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  if (!tabButtons.length) return;

  function showTab(name) {
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `tab-${name}`);
    });
    document.querySelectorAll(".nav-link[data-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
}

/* ------------------------------------------------------------
   3. DATABASE INITIALIZATION
   On first load, seed savio_blogs / savio_gallery with rich
   mock content so the public site never looks empty. Existing
   data (e.g. added by an admin) is never overwritten.
------------------------------------------------------------- */
function seedDatabase() {
  if (!localStorage.getItem("savio_blogs")) {
    const defaultBlogs = [
      {
        id: cryptoId(),
        title: "Robotics Panel Wins Regional Line-Follower Contest",
        category: "Extracurricular",
        image: "https://images.unsplash.com/photo-1581091870621-1cf2c7a67e4d?q=80&w=800&auto=format&fit=crop",
        content:
          "Six Middle College students spent their term break debugging sensors and motor timing — and it paid off. Savio's Robotics Panel placed first in the regional line-follower contest, beating teams from three older, larger schools. The team says the real win was learning to read a datasheet without panicking.",
        date: daysAgo(2),
      },
      {
        id: cryptoId(),
        title: "Senior Leadership Capstones Go Live",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        content:
          "This year's Senior Leadership capstone projects were deployed to the public internet for the first time — including a community noticeboard app and a Luganda vocabulary trainer built by two Form 6 students. Both projects are now maintained by the students themselves.",
        date: daysAgo(9),
      },
      {
        id: cryptoId(),
        title: "Mid-Term Ethics Symposium Draws Record Turnout",
        category: "Academic",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        content:
          "Parents and alumni packed the main hall for this term's Ethics Symposium, where Senior Leadership students debated the responsibilities that come with building software that other people depend on.",
        date: daysAgo(15),
      },
      {
        id: cryptoId(),
        title: "Admissions Open for Term 3",
        category: "Announcement",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
        content:
          "Applications for Term 3 are now open across all three academic tracks. Tours are available by appointment on weekday afternoons — reach out through our Admissions page to book a slot.",
        date: daysAgo(21),
      },
    ];
    localStorage.setItem("savio_blogs", JSON.stringify(defaultBlogs));
  }

  if (!localStorage.getItem("savio_gallery")) {
    const defaultGallery = [
      {
        id: cryptoId(),
        title: "Sports Day 2026",
        caption: "The 400m relay final, house colours flying.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: cryptoId(),
        title: "Robotics Lab",
        caption: "Middle College wiring up a line-follower chassis.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: cryptoId(),
        title: "Literacy Guild",
        caption: "Junior School's weekly reading circle.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: cryptoId(),
        title: "Campus Grounds",
        caption: "The main quad on a clear Kampala morning.",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      },
    ];
    localStorage.setItem("savio_gallery", JSON.stringify(defaultGallery));
  }

  if (!localStorage.getItem("savio_messages")) {
    localStorage.setItem("savio_messages", JSON.stringify([]));
  }
}

function cryptoId() {
  return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/* ------------------------------------------------------------
   4. RENDER: BLOG GRID (Home Hub)
------------------------------------------------------------- */
function renderBlogGrid() {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;
  const blogs = JSON.parse(localStorage.getItem("savio_blogs") || "[]")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!blogs.length) {
    grid.innerHTML = `<p class="text-muted text-sm">No posts yet — check back soon.</p>`;
    return;
  }

  grid.innerHTML = blogs
    .map(
      (b) => `
    <article class="surface rounded-2xl overflow-hidden hover-lift flex flex-col">
      <div class="h-40 overflow-hidden">
        <img src="${escapeAttr(b.image || fallbackImage())}" alt="" class="w-full h-full object-cover" onerror="this.src='${fallbackImage()}'">
      </div>
      <div class="p-5 flex flex-col flex-1">
        <div class="flex items-center justify-between mb-2">
          <span class="badge">${escapeHtml(b.category)}</span>
          <span class="text-muted text-xs font-mono">${formatDate(b.date)}</span>
        </div>
        <h3 class="font-display font-semibold text-lg mb-1.5 leading-snug">${escapeHtml(b.title)}</h3>
        <p class="text-secondary text-sm line-clamp-3">${escapeHtml(b.content)}</p>
      </div>
    </article>`
    )
    .join("");
}

/* ------------------------------------------------------------
   5. RENDER: GALLERY GRID (Home Hub) + LIGHTBOX
------------------------------------------------------------- */
function renderGalleryGrid() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  const items = JSON.parse(localStorage.getItem("savio_gallery") || "[]");

  if (!items.length) {
    grid.innerHTML = `<p class="text-muted text-sm">No photos yet.</p>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (g) => `
    <div class="gallery-thumb surface rounded-xl aspect-square" data-image="${escapeAttr(g.image)}" data-title="${escapeAttr(g.title)}" data-caption="${escapeAttr(g.caption || "")}">
      <img src="${escapeAttr(g.image)}" alt="${escapeAttr(g.title)}" class="w-full h-full object-cover" onerror="this.src='${fallbackImage()}'">
    </div>`
    )
    .join("");

  grid.querySelectorAll(".gallery-thumb").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.image, el.dataset.title, el.dataset.caption));
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lightbox) return;
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
function openLightbox(src, title, caption) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-img").alt = title;
  document.getElementById("lightbox-caption").textContent = [title, caption].filter(Boolean).join(" — ");
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
}
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
}

function fallbackImage() {
  return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop";
}

/* ------------------------------------------------------------
   6. HERITAGE CALENDAR (lightweight, static-term calendar)
------------------------------------------------------------- */
function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  const label = document.getElementById("calendar-label");
  if (!grid) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  label.textContent = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  // A few illustrative markers so the calendar feels alive
  const holidays = [1, 15];
  const events = [10, 22];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  let html = dayNames.map((d) => `<div class="text-muted text-xs font-mono py-1">${d}</div>`).join("");

  for (let i = 0; i < firstDay; i++) html += `<div></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === now.getDate();
    const isHoliday = holidays.includes(d);
    const isEvent = events.includes(d);
    let classes = "py-2 rounded-lg text-sm";
    let style = "";
    if (isToday) style = "background:var(--accent); color:#fff; font-weight:600;";
    else if (isHoliday) style = "background:var(--gold); color:#1a1300; opacity:0.85;";
    else if (isEvent) style = "border:1.5px solid var(--accent); color:var(--accent);";
    html += `<div class="${classes}" style="${style}">${d}</div>`;
  }

  grid.innerHTML = html;
}

/* ------------------------------------------------------------
   7. TOASTS
------------------------------------------------------------- */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `savio-toast ${type}`;
  const icon =
    type === "success"
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-accent shrink-0" stroke-width="2"><path d="M4 12l5 5L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="shrink-0" style="color:#f87171" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke-linejoin="round"/></svg>`;
  toast.innerHTML = `${icon}<span class="text-sm">${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ------------------------------------------------------------
   8. ADMIN GATE
------------------------------------------------------------- */
function initAdminGate() {
  const fab = document.getElementById("admin-fab");
  const loginModal = document.getElementById("admin-login-modal");
  const closeLoginBtn = document.getElementById("close-login-modal");
  const loginBtn = document.getElementById("admin-login-btn");
  const passcodeInput = document.getElementById("admin-passcode");
  const dashboard = document.getElementById("admin-dashboard");
  const logoutBtn = document.getElementById("admin-logout");

  if (!fab) return; // admin gate only lives on index.html

  fab.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");
    passcodeInput.value = "";
    passcodeInput.focus();
  });

  closeLoginBtn.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    loginModal.classList.remove("flex");
  });

  function attemptLogin() {
    if (passcodeInput.value === ADMIN_PASSCODE) {
      loginModal.classList.add("hidden");
      loginModal.classList.remove("flex");
      dashboard.classList.remove("hidden");
      renderAdminDashboard();
    } else {
      passcodeInput.classList.remove("shake");
      // Force reflow so the animation can restart on repeated failures
      void passcodeInput.offsetWidth;
      passcodeInput.classList.add("shake");
      showToast("Incorrect passcode. Please try again.", "warning");
    }
  }

  loginBtn.addEventListener("click", attemptLogin);
  passcodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") attemptLogin();
  });

  logoutBtn.addEventListener("click", () => {
    dashboard.classList.add("hidden");
  });
}

/* ------------------------------------------------------------
   9. ADMIN DASHBOARD — Blog CMS, Gallery CMS, Inbox, Management
------------------------------------------------------------- */
function renderAdminDashboard() {
  renderBlogManageList();
  renderGalleryManageList();
  renderInbox();
}

function initAdminForms() {
  const blogForm = document.getElementById("blog-form");
  const galleryForm = document.getElementById("gallery-form");

  if (blogForm) {
    blogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const blogs = JSON.parse(localStorage.getItem("savio_blogs") || "[]");
      blogs.push({
        id: cryptoId(),
        title: document.getElementById("blog-title").value.trim(),
        category: document.getElementById("blog-category").value,
        image: document.getElementById("blog-image").value.trim(),
        content: document.getElementById("blog-content").value.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem("savio_blogs", JSON.stringify(blogs));
      blogForm.reset();
      renderBlogGrid();      // update the public home feed live
      renderBlogManageList(); // update the admin management table
      showToast("Blog post published.");
    });
  }

  if (galleryForm) {
    galleryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const gallery = JSON.parse(localStorage.getItem("savio_gallery") || "[]");
      gallery.push({
        id: cryptoId(),
        title: document.getElementById("gallery-title").value.trim(),
        caption: document.getElementById("gallery-caption").value.trim(),
        image: document.getElementById("gallery-image").value.trim(),
      });
      localStorage.setItem("savio_gallery", JSON.stringify(gallery));
      galleryForm.reset();
      renderGalleryGrid();
      renderGalleryManageList();
      showToast("Photo added to gallery.");
    });
  }
}

function renderBlogManageList() {
  const list = document.getElementById("blog-manage-list");
  if (!list) return;
  const blogs = JSON.parse(localStorage.getItem("savio_blogs") || "[]")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!blogs.length) {
    list.innerHTML = `<p class="text-muted text-sm">No blog posts yet.</p>`;
    return;
  }

  list.innerHTML = blogs
    .map(
      (b) => `
    <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-elevated border" style="border-color:var(--border)">
      <div class="min-w-0">
        <p class="text-sm font-medium truncate">${escapeHtml(b.title)}</p>
        <p class="text-muted text-xs font-mono">${escapeHtml(b.category)} · ${formatDate(b.date)}</p>
      </div>
      <button data-id="${b.id}" class="delete-blog-btn shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10" aria-label="Delete post">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color:#f87171" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`
    )
    .join("");

  list.querySelectorAll(".delete-blog-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const blogs = JSON.parse(localStorage.getItem("savio_blogs") || "[]").filter((b) => b.id !== btn.dataset.id);
      localStorage.setItem("savio_blogs", JSON.stringify(blogs));
      renderBlogGrid();
      renderBlogManageList();
      showToast("Blog post deleted.", "warning");
    });
  });
}

function renderGalleryManageList() {
  const list = document.getElementById("gallery-manage-list");
  if (!list) return;
  const items = JSON.parse(localStorage.getItem("savio_gallery") || "[]");

  if (!items.length) {
    list.innerHTML = `<p class="text-muted text-sm">No gallery photos yet.</p>`;
    return;
  }

  list.innerHTML = items
    .map(
      (g) => `
    <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-elevated border" style="border-color:var(--border)">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${escapeAttr(g.image)}" class="w-10 h-10 rounded-lg object-cover shrink-0" onerror="this.src='${fallbackImage()}'">
        <p class="text-sm font-medium truncate">${escapeHtml(g.title)}</p>
      </div>
      <button data-id="${g.id}" class="delete-gallery-btn shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10" aria-label="Delete photo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color:#f87171" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`
    )
    .join("");

  list.querySelectorAll(".delete-gallery-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const items = JSON.parse(localStorage.getItem("savio_gallery") || "[]").filter((g) => g.id !== btn.dataset.id);
      localStorage.setItem("savio_gallery", JSON.stringify(items));
      renderGalleryGrid();
      renderGalleryManageList();
      showToast("Photo removed from gallery.", "warning");
    });
  });
}

function renderInbox() {
  const list = document.getElementById("inbox-list");
  if (!list) return;
  const messages = JSON.parse(localStorage.getItem("savio_messages") || "[]")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!messages.length) {
    list.innerHTML = `<p class="text-muted text-sm">No inquiries yet — new submissions from the Admissions page will appear here.</p>`;
    return;
  }

  list.innerHTML = messages
    .map(
      (m) => `
    <div class="p-4 rounded-xl bg-elevated border" style="border-color:var(--border)">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <p class="font-medium text-sm">${escapeHtml(m.name)}</p>
            <span class="badge">${escapeHtml(m.relationship)}</span>
          </div>
          <p class="text-muted text-xs font-mono">${escapeHtml(m.email)}${m.phone ? " · " + escapeHtml(m.phone) : ""} · ${formatDate(m.date)}</p>
          <p class="text-secondary text-sm mt-2">${escapeHtml(m.message)}</p>
        </div>
        <button data-id="${m.id}" class="delete-message-btn shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10" aria-label="Delete message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color:#f87171" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`
    )
    .join("");

  list.querySelectorAll(".delete-message-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const messages = JSON.parse(localStorage.getItem("savio_messages") || "[]").filter((m) => m.id !== btn.dataset.id);
      localStorage.setItem("savio_messages", JSON.stringify(messages));
      renderInbox();
      showToast("Message deleted.", "warning");
    });
  });
}

/* ------------------------------------------------------------
   10. CONTACT FORM (contact.html only)
   Intercepts submission, saves into savio_messages, shows a
   success toast, and clears the form.
------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem("savio_messages") || "[]");
    messages.push({
      id: cryptoId(),
      name: document.getElementById("cf-name").value.trim(),
      email: document.getElementById("cf-email").value.trim(),
      phone: document.getElementById("cf-phone").value.trim(),
      relationship: document.getElementById("cf-relationship").value,
      message: document.getElementById("cf-message").value.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem("savio_messages", JSON.stringify(messages));
    form.reset();
    showToast("Thank you — your inquiry has been sent!");
  });
}

/* ------------------------------------------------------------
   11. SMALL HTML-SAFETY HELPERS
   Since content can be entered by an admin through plain text
   fields, escape it before injecting into innerHTML.
------------------------------------------------------------- */
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function escapeAttr(str) {
  return (str || "").replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------
   12. BOOTSTRAP
------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  seedDatabase();
  initTheme();
  initMobileMenu();
  initTabs();
  renderBlogGrid();
  renderGalleryGrid();
  initLightbox();
  renderCalendar();
  initAdminGate();
  initAdminForms();
  initContactForm();
});
