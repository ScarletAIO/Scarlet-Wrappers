"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = new class APIRoutes {
    constructor() { }
    get routes() {
        return new Promise((resolve, reject) => {
            axios_1.default.get("https://scarletaio.herokuapp.com/routes").then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
    ;
    get routesWithAuth() {
        return new Promise((resolve, reject) => {
            axios_1.default.get("https://scarletaio.herokuapp.com/routes/auth").then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
};
