"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
// defining data structure
const Notifications = new _1.default.Schema({
    message: { type: String, required: true },
    channelName: { type: String, required: true },
    unNotifiiedUsers: { type: [String], required: true },
    date: { type: Date, required: true },
});
const NotificationModel = _1.default.model("Notifications", Notifications);
exports.default = NotificationModel;
