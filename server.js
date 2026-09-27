export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  return res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
}