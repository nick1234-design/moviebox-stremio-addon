export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const path = new URL(req.url, "http://localhost").pathname;

  if (path === "/manifest.json") {
    return res.end(JSON.stringify({
      id: "com.nick1234.moviebox",
      version: "1.0.0",
      name: "MovieBox Test",
      description: "MovieBox Stremio addon",
      resources: ["catalog", "meta", "stream"],
      types: ["movie", "series"],
      catalogs: []
    }));
  }

  return res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
}