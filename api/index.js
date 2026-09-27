export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const path = req.url.split("?")[0];

  if (path === "/api/manifest.json" || path === "/manifest.json") {
    return res.status(200).json({
      id: "com.nick1234.moviebox",
      version: "1.0.0",
      name: "MovieBox Test",
      description: "MovieBox Stremio addon",
      resources: ["catalog", "meta", "stream"],
      types: ["movie", "series"],
      catalogs: []
    });
  }

  return res.status(200).json({
    status: "ok",
    addon: "MovieBox Test"
  });
}