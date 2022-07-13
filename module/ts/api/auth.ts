import axios from "axios";
import UserDto from "./interface/User.dto";

interface AuthData {
    password: string;
    id: string;
}

export default new class Auth {
    constructor() {}

    public async login(user: UserDto): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async register(user: AuthData | { id: string, password: string }, password?: string) {
        password = password || user["password"];
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                localStorage.setItem("token", res.data.accesstoken);
                localStorage.setItem("refreshKey", res.data.refreshToken);
                resolve(res.data);
            })
        });
    }
}