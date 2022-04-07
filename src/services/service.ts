import axios from 'axios';

const api = axios.create({
    // withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'https://servaiyeretail-api.azurewebsites.net/',
});

export class Service {
    url = 'http://localhost:5000';

    predictText = async (text: string) => {
        return await api.post(this.url + `/predict`, text);
    };

    predictFile = async (file: File) => {
        const data = new FormData();
        data.append('file', file);
        return await api.post(`/upload`, data);
    };
}
