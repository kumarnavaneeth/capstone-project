const axios = require("axios");
const loadConfig = async () => {
    try {
        const configServerUrl = process.env.CONFIG_SERVER_URL || "http://localhost:8888";
        const appName = "user_service";
        const profile = process.env.NODE_ENV || "default"; 
        const response = await axios.get(`${configServerUrl}/${appName}/${profile}`);
        const properties = response.data.propertySources[0].source;
        Object.keys(properties).forEach(key => {
            process.env[key] = properties[key];
        });
        console.log("Config loaded from config server");
    } catch (error) {
        console.error("Failed to load config from server:", error.message);
    }
};
module.exports = loadConfig;