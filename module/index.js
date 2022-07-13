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
exports.default = new class Scarlet {
    constructor() { }

    /**
     * @description Send a POST Request to create a new user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; }} user 
     * @returns {Promise<object>}
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            new Promise((resolve, reject) => {
                user_1.default.createUser(user).then((res) => {
                    localStorage.setItem("id", res.id);
                    auth_1.default.register(user).then((res) => {
                        localStorage.setItem("token", res.accesstoken);
                    });
                    return resolve(res);
                }).catch((err) => {
                    return reject(err);
                });
            });
        });
    }

    /**
     * @description Get the user by ID
     * @param {string} id
     * @returns {Promise<any>}
     */
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (localStorage.getItem("id") !== id) {
                return new Promise((resolve, reject) => {
                    user_1.default.getUser(id).then((res) => {
                        return resolve(res);
                    }).catch((err) => {
                        return reject(err);
                    });
                });
            }
            else {
                return new Promise((resolve) => {
                    resolve(localStorage.getItem("id"));
                });
            }
        });
    }
    /**
     * @description Send a PUT Request to update a user
     * @param {string} id 
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user 
     * @returns {Promise<object>}
     */
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user_1.default.updateUser(id, user).then((res) => {
                    return resolve(res);
                }).catch((err) => {
                    return reject(err);
                });
            });
        });
    }
    /**
     * @description Send a DELETE Request to delete a user
     * @param {string} id 
     * @param {string} password 
     * @returns {Promise<any>}
     */
    deleteUser(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user_1.default.deleteUser(id, password).then((res) => {
                    return resolve(res);
                }).catch((err) => {
                    return reject(err);
                });
            });
        });
    }
    /**
     * @description Send a request to retrieve a new token
     * @returns {Promise<any>}
     */
    getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                auth_1.default.login({
                    id: localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("id"),
                    password: localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("password"),
                }).then((res) => {
                    console.info(`Storing Access Token into Local Storage...\n${res.accesstoken}`);
                    localStorage.setItem("token", res.accesstoken);
                    console.info(`Storing Refresh Token into Local Storage...\n${res.refreshToken}`);
                    localStorage.setItem("refreshKey", res.refreshToken);
                    return resolve(res);
                }).catch((err) => {
                    return reject(err);
                });
            });
        });
    }
};
