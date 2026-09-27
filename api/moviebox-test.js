import axios from "axios";

export default async function handler(req, res) {
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

    res.status(200).json({
      ok: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.response?.data || error.message
    });
  }
}