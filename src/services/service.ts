import axios from 'axios';

const api = axios.create({
    // withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'https://servaiyeretail-api.azurewebsites.net/',
});

export class Service {
    url = 'http://127.0.0.1:5000';

    predictText = async (text: string) => {
        return (await api.post(this.url + `/predict`, { data: text })).data;
    };

    predictCsv = async (file: File) => {
        const data = new FormData();
        data.append('file', file);
        return (await api.post(`/uploadcsv`, data)).data;
    };

    predictFile = async (file: File) => {
        debugger
        const data = new FormData();
        data.append('file', file);
        return (await api.post(`${this.url}/audioupload`, data)).data;
    };
}
