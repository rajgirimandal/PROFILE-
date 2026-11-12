document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll progress bar
  const scrollBar = document.getElementById("scrollBar");
  const updateScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (scrollBar) scrollBar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  // 2. Mobile navigation toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Active nav highlight on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const highlightNav = () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.getAttribute("id");
      }
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  // 4. Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 5. Project category filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll("[data-tags]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectItems.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const show = filter === "all" || tags.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // 6. Architecture diagram switcher
  const archTabs = document.querySelectorAll(".arch-tab");
  const archPanels = document.querySelectorAll(".arch-panel");
  archTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      archTabs.forEach((t) => t.classList.remove("active"));
      archPanels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(`arch-${tab.dataset.arch}`);
      if (target) target.classList.add("active");
    });
  });

  // 7. Toast helper & collaboration form
  const toast = document.getElementById("toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("girirajmandal1234@gmail.com");
        showToast("Copied girirajmandal1234@gmail.com to clipboard");
      } catch {
        showToast("Email: girirajmandal1234@gmail.com");
      }
    });
  }

  const collabForm = document.getElementById("collabForm");
  if (collabForm) {
    collabForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const topic = document.getElementById("topicSelect").value;
      const msg = document.getElementById("senderMsg").value.trim();
      const subject = encodeURIComponent(`[${topic}] Collaboration from ${name}`);
      const body = encodeURIComponent(`Hi Rajgiri,

Name / Organization: ${name}
Topic: ${topic}

${msg}
`);
      window.location.href = `mailto:girirajmandal1234@gmail.com?subject=${subject}&body=${body}`;
      showToast("Opening your email client...");
    });
  }
});
