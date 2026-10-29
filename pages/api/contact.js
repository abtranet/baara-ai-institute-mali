export default function handler(req, res) {
  return res.status(501).json({ error: "Not configured" });
}
