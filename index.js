"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./api/auth"));
const promises_1 = __importDefault(require("node:fs/promises"));
exports.default = new class Scarlet {
    constructor() { }
    /**
     * @description Send a POST Request to create a new user
     * @param {{ username: string; firstName:string, age:number; email: string; password: string | null; }} user
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.createUser(user).then((res) => {
                return res;
            }).catch((err) => {
                console.error(Error(err));
            });
        });
    }
    /**
     * @description Get the user by ID
     * @param {{ username: string; firstName:string, age:number; email: string; password: string | null; id: string; }} user
     */
    getUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // First check if the user token is valid:
            return yield auth_1.default.checkIfTokenExpired(user).then(() => __awaiter(this, void 0, void 0, function* () {
                // Whether it's valid or not, we can get the user
                // since the token gets renewed every hour
                return yield user_1.default.getUser(user.id).then((res) => {
                    return {
                        message: res.message,
                        user: res.user
                    };
                }).catch((err) => {
                    console.error(Error(err));
                });
            })).catch((err) => {
                console.error(Error(err));
            });
        });
    }
    /**
     * @description Send a PUT Request to update a user
     * @param {{ username: string; firstName:string, age:number; email: string; password: string | null; id: string; }} user
     */
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.checkIfTokenExpired(user).then(() => __awaiter(this, void 0, void 0, function* () {
                return yield user_1.default.updateUser(user.id, user).then((res) => {
                    return res;
                }).catch((err) => {
                    console.error(Error(err));
                });
            }));
        });
    }
    /**
     * @description Send a DELETE Request to delete a user
     * @param {{ username: string, firstName:string, age:number, email: string, password: string | null, id: string }} user
     */
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.checkIfTokenExpired(user).then(() => __awaiter(this, void 0, void 0, function* () {
                return yield user_1.default.deleteUser(user.id, user.password).then((res) => {
                    return res.message;
                }).catch((err) => {
                    console.error(Error(err));
                });
            }));
        });
    }
    /**
     * @description Send a request to retrieve a new token
     * @param {{ username: string; firstName:string, age:number; email: string; password: string | null; id: string; }} user
     * @returns
     */
    refreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (localStorage.length >= 1) {
                yield auth_1.default.login(user).then((res) => {
                    localStorage.setItem("token", res.accessToken);
                    localStorage.setItem("refreshKey", res.refreshToken);
                    const storage = {
                        key: res.accessToken,
                        expires_in: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
                        refreshKey: res.refreshToken
                    };
                    promises_1.default.writeFile("priv.key", JSON.stringify(storage), {
                        encoding: "utf8",
                        flag: "w"
                    }).then(() => {
                        console.log("Token saved and expires in 1 hour");
                    }).catch((err) => {
                        console.error(Error(err));
                    });
                });
            }
            else {
                yield auth_1.default.register(user).then((res) => {
                    localStorage.setItem("token", res.accessToken);
                    localStorage.setItem("refreshKey", res.refreshToken);
                    const storage = {
                        key: res.accessToken,
                        expires_in: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
                        refreshKey: res.refreshToken
                    };
                    promises_1.default.writeFile("priv.key", JSON.stringify(storage), {
                        encoding: "utf8",
                        flag: "w"
                    }).then(() => {
                        console.log("Token saved and expires in 1 hour");
                    }).catch((err) => {
                        console.error(Error(err));
                    });
                });
            }
        });
    }
    /**
     * @automated True
     * @description Analyze the content to detect for phishing or harassment
     * @param {string} content - The content to analyse
     * @deprecated
     * @returns
     */
    analyzer(content) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method currently not available. Please refer to issue #3, on ScarletAIO/API, for more information.");
        });
    }
};
