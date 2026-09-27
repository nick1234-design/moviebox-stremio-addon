import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const path = new URL(req.url, "http://localhost").pathname;

  // Stremio manifest
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

  // MovieBox connectivity test
  if (path === "/api/moviebox-test") {
    try {
      const response = await axios.post(
        "https://api6.aoneroom.com/wefeed-mobile-bff/subject-api/search",
        {
          keyword: "Avatar",
          type: 0,
          page: 1,
          pageSize: 20
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-M-Version": "4.0.02"
          }
        }
      );

      return res.end(JSON.stringify({
        ok: true,
        data: response.data
      }));
    } catch (error) {
      return res.end(JSON.stringify({
        ok: false,
        error: error.response?.data || error.message
      }));
    }
  }

  return res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
}