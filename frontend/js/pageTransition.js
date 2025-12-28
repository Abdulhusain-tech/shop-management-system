// pageTransition.js
document.querySelectorAll("a[href]").forEach(el => {
  el.addEventListener("click", e => {
    const link = el.getAttribute("href");

    if (!link || link.startsWith("#")) return;

    e.preventDefault();
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = link;
    }, 200);
  });
});
