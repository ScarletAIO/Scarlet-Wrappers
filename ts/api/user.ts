import axios from "axios";
import CreateUserDto from "./interface/CreateUser.dto";
import UserDto from "./interface/User.dto";

export default new class User {
    constructor() {};

    public async getUser(id: UserDto["id"]): Promise<{ message: string, user: UserDto}> {
        return new Promise((resolve, reject) => {
            axios.get(`https://scarletaio.herokuapp.com/v3/users/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                resolve({
                    message: res.data.message,
                    user: res.data
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async createUser(user: CreateUserDto): Promise<{ message: string, user: UserDto}> {
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/v3/users", user).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async updateUser(id: UserDto["id"], user: UserDto): Promise<UserDto> {
        return new Promise((resolve, reject) => {
            axios.put(`https://scarletaio.herokuapp.com/v3/users/${id}`, user, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 
     * @param {string} id User id
     * @param {string} password User password
     * @returns Promise<{ message: string }>
     */
    public async deleteUser(id: UserDto["id"], password: UserDto["password"]): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
            axios.delete(`https://scarletaio.herokuapp.com/v3/users/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    password: password
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async resetPassword(id: UserDto["id"], password: UserDto["password"]): Promise<UserDto> {
        return new Promise((resolve, reject) => {
            axios.put(`https://scarletaio.herokuapp.com/v3/users/${id}/reset-password`, {
                password: password
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}