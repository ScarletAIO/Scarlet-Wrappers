import CreateUserDto from "./api/interface/CreateUser.dto";
import User from "./api/user";
import UserDto from './api/interface/User.dto';
import auth from "./api/auth";

export default new class Scarlet {
    constructor() {}

    public async createUser(user: CreateUserDto): Promise<any | void> {
        new Promise((resolve, reject) => {
            User.createUser(user).then((res) => {
                localStorage.setItem("id", res.id);
                auth.register(user).then((res: any) => {
                    localStorage.setItem("token", res.accesstoken);
                });
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    public async getUser(id: string): Promise<any> {
        if (localStorage.getItem("id") !== id) {
            return new Promise((resolve, reject) => {
                User.getUser(id).then((res) => {
                    return resolve(res);
                }).catch((err) => {
                    return reject(err);
                });
            });
        } else {
            return new Promise((resolve) => {
                resolve(localStorage.getItem("id"));
            });
        }
    }

    public async updateUser(id: string, user: UserDto): Promise<any> {
        return new Promise((resolve, reject) => {
            User.updateUser(id, user).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    public async deleteUser(id: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            User.deleteUser(id, password).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    public async getRefreshToken(): Promise<any> {
        return new Promise((resolve, reject) => {
            auth.login({
                id: localStorage?.getItem("id"),
                password: localStorage?.getItem("password"),
            }).then((res) => {
                console.info(`Storing Access Token into Local Storage...\n${res.accesstoken}`);
                localStorage.setItem("token", res.accesstoken);
                console.info(`Storing Refresh Token into Local Storage...\n${res.refreshToken}`);
                localStorage.setItem("refreshKey", res.refreshToken);
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        })
    }
}