import { ConfigData } from "../data/config";
config = ConfigData();
const BASE_URL = `${config.backend.ipAddress}:${config.backend.port}`;

const request = async (endpoint, options = {}) => {
    const { method = 'GET', headers = {}, body } = options;

    const details = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, details);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};

export default request;