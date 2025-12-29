export default function handler(req, res) {
  res.json([
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 250 }
  ]);
}
