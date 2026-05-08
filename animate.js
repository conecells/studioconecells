/* Conecells — simple reveal-on-scroll animations.
   Auto-applied to every <section> rendered into #root. No per-component changes needed. */
(function () {
  if (typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        // Stagger direct children of the section a touch.
        var section = e.target;
        section.classList.add("cc-in");
        io.unobserve(section);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  function tag(el) {
    if (!(el instanceof Element)) return;
    if (el.matches("section, footer.cc-section, header.cc-nav")) {
      if (!el.classList.contains("cc-anim")) {
        el.classList.add("cc-anim");
        // Header animates immediately (it's above the fold and fixed-ish).
        if (el.matches("header.cc-nav")) {
          requestAnimationFrame(function () { el.classList.add("cc-in"); });
        } else {
          io.observe(el);
        }
      }
    }
    // Walk descendants too — React renders nest sections inside other wrappers.
    if (el.querySelectorAll) {
      el.querySelectorAll("section, footer.cc-section").forEach(function (n) {
        if (!n.classList.contains("cc-anim")) {
          n.classList.add("cc-anim");
          io.observe(n);
        }
      });
    }
  }

  function start() {
    var root = document.getElementById("root") || document.body;
    tag(root);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(tag);
      });
    }).observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
