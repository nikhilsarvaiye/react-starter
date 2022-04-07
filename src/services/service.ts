import axios from 'axios';

export class Service {
    url = 'http://localhost:5000';
    
    predictText = async (text: string) => {
        return await axios.post(this.url + `/predict`, text);
    };
}
