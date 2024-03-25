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
const _1 = __importDefault(require("."));
const notifications_1 = __importDefault(require("./notifications"));
const channel_1 = __importDefault(require("./channel"));
// Defining data structure
const MixTape = new _1.default.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    duration: { type: Number, required: true },
    channel: {
        type: _1.default.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    creator: {
        type: _1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
// Updating the channel and user models whenever a mixtape has been posted
function updateChannelAndUser(doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const channelDoc = yield channel_1.default.findById(doc.channel);
        if (!channelDoc) {
            throw new Error("Channel not found");
        }
        // Push the mixtape to the channel's mixTapes array
        yield _1.default
            .model("Channel")
            .updateOne({ _id: doc.channel }, { $push: { mixTapes: doc._id } });
        // Create a notification for the new mixtape
        const newNotification = yield notifications_1.default.create({
            message: `A new mixtape "${doc.name}" was added.`,
            channelName: channelDoc.name,
            unNotifiiedUsers: channelDoc.members,
            date: new Date(),
        });
        const updatedChannel = yield channel_1.default.findByIdAndUpdate(channelDoc._id, { $push: { notifications: newNotification._id } }, { new: true }).populate("notifications");
    });
}
MixTape.post("save", updateChannelAndUser);
const MixTapeModel = _1.default.model("MixTape", MixTape);
exports.default = MixTapeModel;
