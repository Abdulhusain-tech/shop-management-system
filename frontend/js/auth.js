// auth.js

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}

function requireAuth(allowedRoles = []) {
  const token = getToken();
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    alert("Access denied");
    logout();
  }
}

function authFetch(url, options = {}) {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {})
    }
  });
}
