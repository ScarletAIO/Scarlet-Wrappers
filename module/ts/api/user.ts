import axios from "axios";
import CreateUserDto from "./interface/CreateUser.dto";
import UserDto from "./interface/User.dto";

export default new class User {
    constructor() {};

    public async getUser(id: string): Promise<UserDto> {
        return new Promise((resolve, reject) => {
            axios.get(`https://scarletaio.herokuapp.com/v3/users/${id}`, {
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

    public async createUser(user: CreateUserDto): Promise<CreateUserDto> {
        return new Promise((resolve, reject) => {
            axios.post("https://scarletaio.herokuapp.com/v3/users", user).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async updateUser(id: string, user: UserDto): Promise<UserDto> {
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

    public async deleteUser(id: string, password: string): Promise<any> {
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

    public async resetPassword(id: string, password: string): Promise<UserDto> {
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