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
exports.default = new class Auth {
    constructor() { }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
    register(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            password = password || user["password"];
            return new Promise((resolve, reject) => {
                axios_1.default.post("https://scarletaio.herokuapp.com/auth/", user).then(res => {
                    localStorage.setItem("token", res.data.accesstoken);
                    localStorage.setItem("refreshKey", res.data.refreshToken);
                    resolve(res.data);
                });
            });
        });
    }
};
