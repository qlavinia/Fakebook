//call catre api -> register

import axios from 'axios';

const API_BASE_URL = 'https://localhost:7190/api/account';

export const registerService = {
    async performRegister(registerData) {
        const response = await axios.post(`${API_BASE_URL}/register`, registerData);
        return response.data;
    },
};