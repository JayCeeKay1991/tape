"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
// defining data structure
const Channel = new _1.default.Schema({
    name: { type: String, required: true },
    picture: String,
    owner: {
        type: _1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    mixTapes: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: 'MixTape',
        },
    ],
    comments: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: 'Comments',
        },
    ],
    notifications: [
        {
            type: _1.default.Schema.Types.ObjectId,
            ref: "Notifications",
        },
    ],
});
const ChannelModel = _1.default.model('Channel', Channel);
exports.default = ChannelModel;
