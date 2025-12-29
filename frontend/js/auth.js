// auth.js - Enhanced with better error handling

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("role");
}

function getUserName() {
  return localStorage.getItem("userName");
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  }
}

function requireAuth(allowedRoles = []) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    alert("Please login to continue");
    window.location.href = "login.html";
    return false;
  }

  // If specific roles are required, check them
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    alert(`Access denied! This page requires: ${allowedRoles.join(" or ")} role.`);
    
    // Redirect to appropriate dashboard based on current role
    const dashboards = {
      admin: "admin-dashboard.html",
      owner: "owner-dashboard.html",
      employee: "employee-dashboard.html",
      user: "user-dashboard.html"
    };
    
    window.location.href = dashboards[role] || "dashboard.html";
    return false;
  }

  return true;
}

async function authFetch(url, options = {}) {
  const token = getToken();

  if (!token) {
    console.error("No auth token found");
    window.location.href = "login.html";
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "login.html";
      return response;
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Auto-redirect to role-specific dashboard if on generic dashboard
function redirectToRoleDashboard() {
  const role = getRole();
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "dashboard.html" && role) {
    const dashboards = {
      admin: "admin-dashboard.html",
      owner: "owner-dashboard.html",
      employee: "employee-dashboard.html",
      user: "user-dashboard.html"
    };
    
    if (dashboards[role]) {
      window.location.href = dashboards[role];
    }
  }
}

// Initialize user info on page load
function initUserInfo() {
  const userName = getUserName();
  const userNameElements = document.querySelectorAll("#userName");
  
  if (userName && userNameElements.length > 0) {
    userNameElements.forEach(el => {
      el.textContent = userName;
    });
  }
}

// Call initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUserInfo);
} else {
  initUserInfo();
}