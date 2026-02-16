

// ===== HERO SLIDER DATA =====
const slides = [
    {
      image: "img/bbq.webp",
      kicker: "ВЕЧЕРИ НА ЖАР И ПОД ЗВЕЗДИТЕ",
      title: "BBQ\nМОМЕНТИ",
      line1: "Голяма маса, огън и аромат на гора",
      line2: "за компании, които обичат истинските вечери",
      statValue: "1",
      statUnit: "ЗОНА",
      statLabel: "BBQ С ПОКРИВ",
      primary: { text: "Виж BBQ зоната", href: "#bbq" },
      secondary: { text: "Запази уикенд", href: "#booking" },
    },
    {
      image: "img/basein.webp",
      kicker: "ЛЯТО В ЛАТЕ ЦВЕТОВЕ",
      title: "БАСЕЙН\nИ ТИШИНА",
      line1: "Сутрешно кафе и вода, която успокоява",
      line2: "следобед — слънце, вечер — прохлада",
      statValue: "28",
      statUnit: "°C",
      statLabel: "ЛЯТНО УСЕЩАНЕ",
      primary: { text: "Разгледай басейна", href: "#pool" },
      secondary: { text: "Галерия", href: "#gallery" },
    },
    {
      image: "img/batunski-manastir.webp",
      kicker: "НА КРАЧКА ОТ ПРИРОДАТА",
      title: "МЯСТО\nЗА РАЗХОДКИ",
      line1: "Пътеки, въздух и любими гледки",
      line2: "открий близките маршрути и забележителности",
      statValue: "15",
      statUnit: "МИН",
      statLabel: "ДО СПОКОЙНА ПЪТЕКА",
      primary: { text: "Виж маршрути", href: "#trips" },
      secondary: { text: "Локация", href: "#location" },
    },
  ];
  
  // ===== ELEMENTS =====
  const header = document.getElementById("siteHeader");
  
  const sliderEl = document.getElementById("heroSlider");
  const kickerEl = document.getElementById("heroKicker");
  const titleEl = document.getElementById("heroTitle");
  const line1El = document.getElementById("heroLine1");
  const line2El = document.getElementById("heroLine2");
  
  const primaryCta = document.getElementById("primaryCta");
  const secondaryCta = document.getElementById("secondaryCta");
  
  const statValueEl = document.getElementById("statValue");
  const statUnitEl = document.getElementById("statUnit");
  const statLabelEl = document.getElementById("statLabel");
  
  const counterEl = document.getElementById("progressCounter");
  const barsEl = document.getElementById("progressBars");
  
  const prevBtn = sliderEl.querySelector("[data-prev]");
  const nextBtn = sliderEl.querySelector("[data-next]");
  
  // Dropdowns (multiple)
  const dropdowns = [...document.querySelectorAll("[data-dropdown]")];
  
  // ===== OFFCANVAS MENU =====
  const burgerBtn = document.getElementById("burgerBtn");
  const offcanvas = document.getElementById("offcanvas");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  
  // ===== STATE =====
  let index = 0;
  let timerId = null;
  let revealTimers = [];
  
  const AUTOPLAY_MS = 6500;
  
  // slower stagger timing
  const STAGGER_TITLE_MS = 40;
  const STAGGER_L1_MS = 220;
  const STAGGER_L2_MS = 420;
  
  // ===== HELPERS =====
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  
  function setMultilineTitle(text) {
    titleEl.innerHTML = (text || "").replaceAll("\n", "<br/>");
  }
  
  function setActiveBars(i) {
    if (!barsEl) return;
    const bars = [...barsEl.querySelectorAll(".bar")];
    bars.forEach((b, idx) => b.classList.toggle("is-active", idx === i));
  }
  
  function applyRevealClasses() {
    kickerEl.classList.add("reveal");
    titleEl.classList.add("reveal");
    line1El.classList.add("reveal");
    line2El.classList.add("reveal");
  }
  
  function fastStaggerIn() {
    revealTimers.forEach(t => clearTimeout(t));
    revealTimers = [];
  
    [kickerEl, titleEl, line1El, line2El].forEach(el => el.classList.remove("is-in"));
    void titleEl.offsetWidth; // force reflow (важно)
  
    revealTimers.push(setTimeout(() => kickerEl.classList.add("is-in"), 0));
    revealTimers.push(setTimeout(() => titleEl.classList.add("is-in"), STAGGER_TITLE_MS));
    revealTimers.push(setTimeout(() => line1El.classList.add("is-in"), STAGGER_L1_MS));
    revealTimers.push(setTimeout(() => line2El.classList.add("is-in"), STAGGER_L2_MS));
  }
  
  function renderSlide(i) {
    const s = slides[i];
  
    sliderEl.style.backgroundImage = `url("${s.image}")`;
    // reset zoom
sliderEl.style.transition = "none";
sliderEl.style.setProperty("--bgZoom", "108%");

// force reflow (много важно)
void sliderEl.offsetWidth;

// activate animation
sliderEl.style.transition = "background-size 6.6s ease";
sliderEl.style.setProperty("--bgZoom", "118%");

  
    const kickerText = kickerEl.querySelector(".k-text");
    if (kickerText) kickerText.textContent = s.kicker || "";
  
    setMultilineTitle(s.title || "");
    line1El.textContent = s.line1 || "";
    line2El.textContent = s.line2 || "";
  
    statValueEl.textContent = s.statValue ?? "";
    statUnitEl.textContent = s.statUnit || "";
    statLabelEl.textContent = s.statLabel || "";
  
    if (primaryCta && s.primary) {
      primaryCta.innerHTML = "";
      primaryCta.textContent = s.primary.text;
      primaryCta.href = s.primary.href;
      primaryCta.insertAdjacentHTML("beforeend", ' <span class="btn-ic">▶</span>');
    }
    if (secondaryCta && s.secondary) {
      secondaryCta.textContent = s.secondary.text;
      secondaryCta.href = s.secondary.href;
    }
  
    counterEl.textContent = `${pad2(i + 1)}/${pad2(slides.length)}`;
    setActiveBars(i);
  
    fastStaggerIn();
  }
  
  function go(dir) {
    index = (index + dir + slides.length) % slides.length;
    renderSlide(index);
    restartAutoplay();
  }
  
  function restartAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => go(1), AUTOPLAY_MS);
  }
  
  function stopAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  
  // ===== DROPDOWNS (desktop) =====
  function closeAllDropdowns(except = null) {
    dropdowns.forEach(dd => {
      if (dd === except) return;
      dd.classList.remove("is-open");
      const btn = dd.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }
  dropdowns.forEach(dd => {
    const btn = dd.querySelector("button");
    if (!btn) return;
  
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains("is-open");
      closeAllDropdowns(dd);
      dd.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });
  document.addEventListener("click", () => closeAllDropdowns(null));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns(null);
  });
  
  // ===== OFFCANVAS OPEN/CLOSE =====
  function openMenu() {
    document.body.classList.add("menu-open");
    burgerBtn.setAttribute("aria-expanded", "true");
    offcanvas.setAttribute("aria-hidden", "false");
    menuOverlay.hidden = false;
  
    // focus close button for accessibility
    setTimeout(() => closeMenuBtn.focus(), 50);
  }
  
  function closeMenu() {
    document.body.classList.remove("menu-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    offcanvas.setAttribute("aria-hidden", "true");
  
    // wait a bit so fade-out looks nice
    setTimeout(() => {
      if (!document.body.classList.contains("menu-open")) menuOverlay.hidden = true;
    }, 280);
  
    burgerBtn.focus();
  }
  
  burgerBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  });
  
  closeMenuBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
  
  // close menu when clicking a link inside it
  offcanvas.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    closeMenu();
  });
  
  // ===== SLIDER EVENTS =====
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
  
  // Header solid on scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-solid", window.scrollY > 10);
  });
  
  // Pause autoplay on hover
  sliderEl.addEventListener("mouseenter", stopAutoplay);
  sliderEl.addEventListener("mouseleave", restartAutoplay);
  
  // Pause autoplay when tab not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else restartAutoplay();
  });
  
  // ===== Touch swipe =====
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  
  sliderEl.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    isSwiping = true;
    stopAutoplay();
  }, { passive: true });
  
  sliderEl.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchStartX);
    const dy = Math.abs(t.clientY - touchStartY);
    if (dy > dx && dy > 12) isSwiping = false;
  }, { passive: true });
  
  sliderEl.addEventListener("touchend", (e) => {
    if (!isSwiping) {
      restartAutoplay();
      return;
    }
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
  
    const SWIPE_THRESHOLD = 40;
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  
    isSwiping = false;
    restartAutoplay();
  }, { passive: true });
  
  // ===== INIT =====
  applyRevealClasses();
  renderSlide(index);
  restartAutoplay();

  
  

  // ===== LOADER (hide on full load) =====
window.addEventListener("load", () => {
  const loader = document.getElementById("vvLoader");
  if (!loader) return;

  // по желание: да се вижда минимум 900ms (за да не "мигне")
  const MIN_MS = 900;
  const started = performance.now();

  const hide = () => {
    loader.classList.add("is-hidden");
    // чистим от DOM след fade
    setTimeout(() => loader.remove(), 450);
  };

  const elapsed = performance.now() - started;
  if (elapsed >= MIN_MS) hide();
  else setTimeout(hide, MIN_MS - elapsed);
});





function setVH() {
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
}

setVH();

window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setVH);
  window.visualViewport.addEventListener("scroll", setVH);
}
