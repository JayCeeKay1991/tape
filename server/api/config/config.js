"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    dbUrl: process.env.DB_URL ||
        `mongodb://127.0.0.1:27017/${process.env.DB_NAME || 'tape'}`,
    port: process.env.PORT || 4000,
};
exports.default = config;
