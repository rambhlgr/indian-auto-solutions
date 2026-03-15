document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".section-space .container, .modern-card, .hero-card, .metric-box, .logo-item"
  );

  if (!revealTargets.length) {
    return;
  }

  document.body.classList.add("scroll-ready");

  revealTargets.forEach((el, index) => {
    el.classList.add("scroll-reveal");
    const step = index % 8;
    el.style.transitionDelay = `${step * 70}ms`;
  });

  const onReveal = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onReveal, {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px",
  });

  revealTargets.forEach((el) => observer.observe(el));

  const heroVisual = document.querySelector(".hero-visual");
  const chips = heroVisual ? heroVisual.querySelectorAll(".floating-chip") : [];

  if (!heroVisual || chips.length === 0) {
    return;
  }

  let rafId = null;
  let x = 0;
  let y = 0;

  const updateChips = () => {
    chips.forEach((chip, i) => {
      const depth = (i + 1) * 0.75;
      chip.style.setProperty("--parallax-x", `${x * depth}px`);
      chip.style.setProperty("--parallax-y", `${y * depth}px`);
    });
    rafId = null;
  };

  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const rx = (event.clientX - rect.left) / rect.width - 0.5;
    const ry = (event.clientY - rect.top) / rect.height - 0.5;

    x = rx * 12;
    y = ry * 10;

    if (!rafId) {
      rafId = window.requestAnimationFrame(updateChips);
    }
  });

  heroVisual.addEventListener("mouseleave", () => {
    x = 0;
    y = 0;

    if (!rafId) {
      rafId = window.requestAnimationFrame(updateChips);
    }
  });
});
