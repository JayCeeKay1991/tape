"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
// defining data structure
const User = new _1.default.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dfjxxmzot/image/upload/v1711191890/upswlzydiqcb0p8th1ys.png",
    },
    channels: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: "Channel",
            required: false,
        },
    ],
    mixTapes: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: "MixTape",
        },
    ],
});
const UserModel = _1.default.model("User", User);
exports.default = UserModel;
