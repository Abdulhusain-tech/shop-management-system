document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("click", e => {
    const link = el.getAttribute("href");
    if (!link) return;

    e.preventDefault();
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = link;
    }, 200);
  });
});
