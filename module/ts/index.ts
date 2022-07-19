import CreateUserDto from "./api/interface/CreateUser.dto";
import User from "./api/user";
import UserDto from './api/interface/User.dto';
import auth from "./api/auth";
import axios from "axios";

export default new class Scarlet {
    constructor() {}

    /**
     * @description Send a POST Request to create a new user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; }} user 
     * @returns {Promise<object>}
     */
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

    /**
     * @description Get the user by ID
     * @param {string} id
     * @returns {Promise<any>}
     */
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

    /**
     * @description Send a PUT Request to update a user
     * @param {string} id 
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     * @returns {Promise<object>}
     */
    public async updateUser(id: string, user: UserDto): Promise<any> {
        return new Promise((resolve, reject) => {
            User.updateUser(id, user).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /**
     * @description Send a DELETE Request to delete a user
     * @param {string} id 
     * @param {string} password 
     * @returns {Promise<any>}
     */
    public async deleteUser(id: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            User.deleteUser(id, password).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }
    
    /**
     * @description Send a request to retrieve a new token
     * @returns {Promise<any>}
     */
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

    /**
     * @automated - True
     * @description Analyze the content to detect for phishing or harassment
     * @param {string} content - The content to analyse
     * @returns 
     */
    public async analyzeContent(content: string): Promise<any> {
        // check for URLs
        const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        const urls = content.match(regex);

        if (urls) {
            return new Promise((resolve, reject) => {
                axios.post("https://api.scarletai.xyz/v3/analyze/link", {
                    domain: urls[0],
                }).then((res) => {
                    return resolve(res.data);
                }).catch((err) => {
                    return reject(err);
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                axios.post("https://api.scarletai.xyz/v3/analyze/msg", {
                    domain: content,
                }).then((res) => {
                    return resolve(res.data);
                }).catch((err) => {
                    return reject(err);
                })
            })
        }
    }
}