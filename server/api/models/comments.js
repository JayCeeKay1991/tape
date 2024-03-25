"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
// defining data structure
const Comments = new _1.default.Schema({
    owner: {
        type: _1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});
const CommentsModel = _1.default.model("Comments", Comments);
exports.default = CommentsModel;
