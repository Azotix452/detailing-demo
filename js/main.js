/* Подставляет контакты из config.js во все нужные места страницы */
(function () {
  var c = window.SITE_CONFIG;
  if (!c) return;

  var waLink = "https://wa.me/" + c.whatsapp +
    "?text=" + encodeURIComponent(c.whatsappMessage);

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.href = waLink;
  });

  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.href = "tel:" + c.phoneLink;
  });

  document.querySelectorAll("[data-phone-text]").forEach(function (el) {
    el.textContent = c.phoneDisplay;
  });

  document.querySelectorAll("[data-email-link]").forEach(function (el) {
    el.href = "mailto:" + c.email;
    el.textContent = c.email;
  });

  document.querySelectorAll("[data-address]").forEach(function (el) {
    el.textContent = c.address;
  });

  document.querySelectorAll("[data-map-link]").forEach(function (el) {
    el.href = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(c.address);
  });

  document.querySelectorAll("[data-studio-name]").forEach(function (el) {
    el.textContent = c.studioName;
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var hoursList = document.querySelector("[data-hours]");
  if (hoursList && c.hours) {
    hoursList.innerHTML = "";
    c.hours.forEach(function (row) {
      var li = document.createElement("li");
      var day = document.createElement("span");
      var time = document.createElement("span");
      day.textContent = row[0];
      time.textContent = row[1];
      li.appendChild(day);
      li.appendChild(time);
      hoursList.appendChild(li);
    });
  }
})();
/* ============================================
   Меню-«бургер» для телефонов
   ============================================ */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setOpen(false); }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) { setOpen(false); }
  });
})();

/* ============================================
   Увеличение фото в галерее
   ============================================ */
(function () {
  var dialog = document.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  var bigImg = dialog.querySelector("img");
  var caption = dialog.querySelector(".lightbox-caption");
  var closeBtn = dialog.querySelector(".lightbox-close");

  function open(img) {
    bigImg.src = img.dataset.full || img.currentSrc || img.src;
    bigImg.alt = img.alt;
    var fig = img.closest("figure");
    var cap = fig ? fig.querySelector("figcaption") : null;
    caption.textContent = cap ? cap.textContent : "";
    dialog.showModal();
  }

  document.querySelectorAll(".gallery-item img").forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.addEventListener("click", function () { open(img); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(img);
      }
    });
  });

  closeBtn.addEventListener("click", function () { dialog.close(); });

  /* Клик по тёмному фону закрывает окно */
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) { dialog.close(); }
  });
})();

/* ============================================
   Плавное появление блоков при прокрутке
   ============================================ */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var items = document.querySelectorAll(".section .container");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(function (el) {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();