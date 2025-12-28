/**
 * Theme Management
 * Handles light/dark theme toggling with smooth transitions
 */

function toggleTheme() {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  
  // Update theme toggle button text if it exists
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const themeButtons = document.querySelectorAll(".theme-toggle");
  themeButtons.forEach(btn => {
    const icon = btn.querySelector(".icon");
    if (icon) {
      icon.textContent = theme === "light" ? "🌙" : "☀️";
    }
  });
}

// Initialize theme on page load
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
  
  updateThemeButton(savedTheme || "dark");
})();

// Add smooth page transition effect
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});