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
const axios_1 = __importDefault(require("axios"));
exports.default = new class User {
    constructor() { }
    ;
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.get(`https://scarletaio.herokuapp.com/v3/users/${id}`, {
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
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.post("https://scarletaio.herokuapp.com/v3/users", user).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.put(`https://scarletaio.herokuapp.com/v3/users/${id}`, user, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     *
     * @param {string} id User id
     * @param {string} password User password
     * @returns Promise<{ message: string }>
     */
    deleteUser(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.delete(`https://scarletaio.herokuapp.com/v3/users/${id}`, {
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
        });
    }
    resetPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.put(`https://scarletaio.herokuapp.com/v3/users/${id}/reset-password`, {
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
        });
    }
};
