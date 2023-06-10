const axios = require("axios");

module.exports = {
  getIPAddress: async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = response.data.ip;
      return ipAddress;
    } catch (error) {
      console.error("Error retrieving IP address:", error);
      return null;
    }
  },
};