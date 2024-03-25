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
exports.deleteChannel = exports.addComment = exports.addUserToChannel = exports.createChannel = exports.getChannel = exports.getChannelsByUser = void 0;
const channel_1 = __importDefault(require("../../models/channel"));
const user_1 = __importDefault(require("../../models/user"));
const comments_1 = __importDefault(require("../../models/comments"));
const mongoose_1 = __importDefault(require("mongoose"));
const getChannelsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const channelsWithUser = yield channel_1.default.find({
            members: userId,
        });
        res.status(200).json(channelsWithUser);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getChannelsByUser = getChannelsByUser;
const getChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channelId = req.params.channelId;
    try {
        const channel = yield channel_1.default.findById(channelId)
            .populate({
            path: "members",
            model: "User",
        })
            .populate({
            path: "mixTapes",
            model: "MixTape",
        })
            .populate({
            path: "comments",
            model: "Comments",
            populate: [
                {
                    path: "owner",
                },
            ],
        });
        if (!channel) {
            res.status(400).json("No channel with that id!");
        }
        res.status(200).json(channel);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.json(`Error retrieving channel`);
    }
});
exports.getChannel = getChannel;
const createChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChannel = new channel_1.default(req.body);
        const savedChannel = yield newChannel.save();
        // update owner
        const updatedUser = yield user_1.default.updateOne({ _id: savedChannel.owner }, { $push: { channels: savedChannel._id } });
        res.status(201).json(savedChannel);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create channel." });
    }
});
exports.createChannel = createChannel;
const addUserToChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelId = req.params.channelId;
        const userId = req.params.userId;
        const newMember = yield user_1.default.findById(userId);
        if (!userId) {
            res.status(400).json("UserId required");
        }
        const channel = yield channel_1.default.findById(channelId);
        if (!channel) {
            res.status(400).json("Channel not found");
        }
        else {
            if (channel.members.includes(newMember._id)) {
                res.status(400).json("User is already a member of this channel");
            }
            // user not already a member, add and save
            channel.members.push(newMember._id);
            yield channel.save();
            const updatedChannel = yield channel_1.default.findById(channelId).populate("members");
            res.status(201).json(updatedChannel);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.json(`Error adding user to channel`);
    }
});
exports.addUserToChannel = addUserToChannel;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelId = req.params.channelId;
        const { owner, message, date } = req.body;
        const newComment = yield comments_1.default.create({ owner, message, date });
        const updatedChannel = yield channel_1.default.findByIdAndUpdate(channelId, { $push: { comments: newComment._id } }, { new: true }).populate("comments");
        if (!updatedChannel) {
            return res.status(400).json("Channel not found");
        }
        res.status(201).json(updatedChannel);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(`Error adding comment`);
    }
});
exports.addComment = addComment;
// DELETE CHANNEL
const deleteChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelId = req.params.channelId;
        const deletedChannel = yield channel_1.default.findOneAndDelete({
            _id: channelId,
        });
        if (!deletedChannel) {
            return res.status(404).json({ error: "Channel not found" });
        }
        if (deletedChannel) {
            yield mongoose_1.default
                .model('User')
                .updateOne({ _id: deletedChannel.owner }, { $pull: { channels: channelId } });
        }
        res.status(204).json({ msg: 'Channel deleted' });
        return;
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred while deleting the channel",
        });
    }
});
exports.deleteChannel = deleteChannel;
