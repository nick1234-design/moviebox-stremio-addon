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
      const response = await axios.post(
        "https://h5-api.aoneroom.com/wefeed-h5api-bff/subject/search",
        {
          keyword: "Avatar",
          page: 1,
          perPage: 20,
          subjectType: 0
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0",
            "x-client-info": JSON.stringify({
              timezone: "America/Los_Angeles"
            })
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