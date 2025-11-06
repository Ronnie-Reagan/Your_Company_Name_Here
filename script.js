(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const body = document.body;

  if (nav && navToggle) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        closeNav();
      });
    });

    const mq = window.matchMedia("(min-width: 768px)");
    const syncNav = (event) => {
      if (event.matches) {
        closeNav();
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", syncNav);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(syncNav);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!target) return;
      const insideNav = nav.contains(target);
      const isToggle = navToggle.contains(target);
      if (!insideNav && !isToggle) {
        closeNav();
      }
    });
  }

  if (nav && body?.dataset?.page) {
    const activePage = body.dataset.page;
    nav.querySelectorAll(".nav-link").forEach((link) => {
      const linkPage = link.getAttribute("data-page");
      const isActive = linkPage === activePage;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const yearTarget = document.querySelector("[data-current-year]");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
})();
