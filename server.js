import {
  MovieboxSession,
  getMovieDetails
} from "moviebox-js-sdk";

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
      const session = new MovieboxSession({
        host: "h5.aoneroom.com",
        mirrorHosts: [
          "h5.aoneroom.com",
          "movieboxapp.in"
        ],
        retry: {
          maxAttempts: 2,
          delayMs: 250
        }
      });

      const details = await getMovieDetails(session, {
        detailPath: "titanic-m7a9yt0abq6"
      });

      return res.end(JSON.stringify({
        ok: true,
        title: details.title,
        details
      }));
    } catch (error) {
      return res.end(JSON.stringify({
        ok: false,
        error: error.message || String(error)
      }));
    }
  }

  return res.end(JSON.stringify({
    status: "ok",
    addon: "MovieBox Test"
  }));
}