import axios from "axios";
import UserDto from "./interface/User.dto";
import fs from "node:fs/promises";
interface AuthData {
    password: UserDto["password"];
    id?: UserDto["id"];
}

export default new class Auth {
    public async login(user: UserDto): Promise<{ accessToken: string, refreshToken: string }> {
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async register(user: AuthData | { id?: UserDto["id"], password: UserDto["password"] }, password?: UserDto["password"]): 
    Promise<
        {
            message: string,
            accessToken: string,
            refreshToken: string
        }
    > {
        password = password || user["password"];
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                localStorage.setItem("token", res.data.accesstoken);
                localStorage.setItem("refreshKey", res.data.refreshToken);
                return resolve(res.data);
            }).catch(err => reject(console.error));
        });
    }

    public async checkIfTokenExpired(user: UserDto): Promise<boolean | undefined> {
        return fs.readFile("../priv.key", "utf8").then(async res => {
            if (JSON.parse(res).token === localStorage.getItem("token")) {
                if (JSON.parse(res).expires_in >= Date.now()) {
                    await this.login(user).then((res) => {
                        localStorage.setItem("token", res.accessToken);
                        localStorage.setItem("refreshKey", res.refreshToken);
                        return true;
                    });
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
    }
}