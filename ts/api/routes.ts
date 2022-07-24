import axios from "axios"

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
};