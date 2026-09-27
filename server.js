import axios from "axios";

export default async function handler(req, res) {
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

  if (path === "/api/moviebox-test") {
    try {
      const response = await axios.get(
        "https://h5.aoneroom.com",
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html,application/xhtml+xml"
          }
        }
      );

      return res.end(JSON.stringify({
        ok: true,
        status: response.status,
        message: "H5 host is reachable",
        dataPreview: String(response.data).slice(0, 500)
      }));
    } catch (error) {
      return res.end(JSON.stringify({
        ok: false,
        status: error.response?.status || null,
        error: error.response?.data || error.message
      }));
    }
  }

  return res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
}