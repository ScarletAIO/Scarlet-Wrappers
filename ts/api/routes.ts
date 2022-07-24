import axios from "axios"
import AnalyzeDto from './interface/Analyze.dto';

export default new class APIRoutes {
    constructor() {}

    public get routes(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            axios.get("https://scarletaio.herokuapp.com/routes").then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    };

    public get routesWithAuth(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            axios.get("https://scarletaio.herokuapp.com/routes/auth").then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    
    public async AnalyzeData(input: any): Promise<AnalyzeDto> {
        let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        const matches = input.match(urlRegex);
        if (matches) {
            // get the URL from the input
            let url = matches[0];
            return await axios.post(`https://api.scarletai.xyz/v3/analyze/link`, {
                url: url
            }).then((res) => {
                return res.data;
            }).catch((err) => { console.error(Error(err)) });
        } else {
            return await axios.post(`https://api.scarletai.xyz/v3/analyze/msg`, {
                text: input
            }).then((res) => {
                return res.data;
            }).catch((err) => { console.error(Error(err)) });
        }
    }
};