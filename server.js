import http from "http";

const PORT = process.env.PORT || 3000;

const manifest = {
  id: "com.nick1234.moviebox",
  version: "1.0.0",
  name: "MovieBox Test",
  description: "MovieBox Stremio addon",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  catalogs: []
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/manifest.json") {
    res.end(JSON.stringify(manifest));
    return;
  }

  res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
});

server.listen(PORT, () => {
  console.log(`MovieBox addon running on port ${PORT}`);
});