// api.js - Fixed for deployment
const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000/api"
  : `${window.location.origin}/api`;

console.log("API_BASE configured as:", API_BASE);