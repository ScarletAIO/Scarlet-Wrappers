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
    AnalyzeData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            const matches = input.match(urlRegex);
            if (matches) {
                // get the URL from the input
                let url = matches[0];
                return yield axios_1.default.post(`https://api.scarletai.xyz/v3/analyze/link`, {
                    url: url
                }).then((res) => {
                    return res.data;
                }).catch((err) => { console.error(Error(err)); });
            }
            else {
                return yield axios_1.default.post(`https://api.scarletai.xyz/v3/analyze/msg`, {
                    text: input
                }).then((res) => {
                    return res.data;
                }).catch((err) => { console.error(Error(err)); });
            }
        });
    }
};
