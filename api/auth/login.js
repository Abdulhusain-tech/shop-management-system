export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "admin123") {
    return res.json({
      token: "dummy-token",
      role: "admin",
      name: "Admin"
    });
  }

  if (email === "owner@test.com" && password === "owner123") {
    return res.json({
      token: "dummy-token",
      role: "owner",
      name: "Owner"
    });
  }

  if (email === "employee@test.com" && password === "emp123") {
    return res.json({
      token: "dummy-token",
      role: "employee",
      name: "Employee"
    });
  }

  return res.status(401).json({ msg: "Invalid credentials" });
}
