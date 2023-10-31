//call catre api -> de logare si delogare

import axios from 'axios';

const API_BASE_URL = 'https://localhost:7190/api/account';

export const authService = {
    async performLogin(credentials) {
        return await axios.post(`${API_BASE_URL}/login`, credentials);
    }
};