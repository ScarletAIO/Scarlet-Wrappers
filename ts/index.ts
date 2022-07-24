import CreateUserDto from "./api/interface/CreateUser.dto";
import User from "./api/user";
import UserDto from './api/interface/User.dto';
import auth from "./api/auth";
import fs from "node:fs/promises";

export default new class Scarlet {
    constructor() {}

    /**
     * @description Send a POST Request to create a new user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; }} user 
     */
    public async createUser(user: CreateUserDto): Promise<void | { message: string, user: UserDto }> {
        return await User.createUser(user).then((res) => {
            return res;
        }).catch((err) => {
            console.error(Error(err));
        });
    }

    /**
     * @description Get the user by ID
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     */
    public async getUser(user: UserDto) {
        // First check if the user token is valid:
        return await auth.checkIfTokenExpired(user).then(async () => {
            // Whether it's valid or not, we can get the user
            // since the token gets renewed every hour
            return await User.getUser(user.id).then((res) => {
                return {
                    message: res.message,
                    user: res.user
                };
            }).catch((err) => {
                console.error(Error(err));
            });
        }).catch((err) => {
            console.error(Error(err));
        });
    }

    /**
     * @description Send a PUT Request to update a user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     */
    public async updateUser(user: UserDto) {
        return await auth.checkIfTokenExpired(user).then(async () => {
            return await User.updateUser(user.id, user).then((res) => {
                return res;
            }).catch((err) => {
                console.error(Error(err));
            });
        });
    }

    /**
     * @description Send a DELETE Request to delete a user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     */
    public async deleteUser(user: UserDto) {
        return await auth.checkIfTokenExpired(user).then(async () => {
            return await User.deleteUser(user.id, user.password).then((res) => {
                return res.message;
            }).catch((err) => {
                console.error(Error(err));
            });
        });
    }
    
    /**
     * @description Send a request to retrieve a new token
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     * @returns 
     */
    public async refreshToken(user: UserDto) {
        if (localStorage.length >= 1) {
            await auth.login(user).then((res) => {
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshKey", res.refreshToken);
                const storage = {
                    key: res.accessToken,
                    expires_in: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
                    refreshKey: res.refreshToken
                }
                fs.writeFile("priv.key", JSON.stringify(storage), {
                    encoding: "utf8",
                    flag: "w"
                }).then(() => {
                    console.log("Token saved and expires in 1 hour");
                }).catch((err) => {
                    console.error(Error(err));
                });
            });
        } else {
            await auth.register(user).then((res) => {
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshKey", res.refreshToken);
                const storage = {
                    key: res.accessToken,
                    expires_in: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
                    refreshKey: res.refreshToken
                }
                fs.writeFile("priv.key", JSON.stringify(storage), {
                    encoding: "utf8",
                    flag: "w"
                }).then(() => {
                    console.log("Token saved and expires in 1 hour");
                }).catch((err) => {
                    console.error(Error(err));
                });
            });
        }
    }

    /**
     * @automated True
     * @description Analyze the content to detect for phishing or harassment
     * @param {string} content - The content to analyse
     * @deprecated
     * @returns 
     */
    public async analyzer(content: string) {
        throw new Error("Method currently not available. Please refer to issue #3, on ScarletAIO/API, for more information.");
    }
    
}