import http from "http";
import https from "https";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const module = API_BASE_URL.includes("https") ? https : http;
const api_url = `${API_BASE_URL}${process.env.API_CONVERSION_PARAM || "/convert"}`;

class IncomeRepository {
  async makeRequest(url) {
    const request = new Promise((resolve, reject) => {
      var chunks = [];

      module.get(url, (response) => {
        response.on("data", function (data) {
          chunks.push(data);
        });

        response.on("error", reject);
        response.on("end", () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });

    return request;
  }

  async getConversions() {
    const { results: request } = await this.makeRequest(api_url);

    return request;
  }
}

export default IncomeRepository;
