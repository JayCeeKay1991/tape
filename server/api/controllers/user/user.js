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
exports.getUserById = exports.editUser = exports.login = exports.createUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json('Error getting users');
        console.error(error);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                error: '400',
                message: 'Please provide email and password',
            });
        }
        // Check if the user already exists
        const userInDb = yield user_1.default.findOne({ email: email });
        if (userInDb)
            return res
                .status(409)
                .json({ error: '409', message: 'User already exists' });
        // Check if password is empty
        if (!password) {
            return res
                .status(400)
                .json({ error: '400', message: 'Password is required' });
        }
        // Hash the password
        const hash = yield bcrypt_1.default.hash(password, 10);
        // Create a new user with hashed password
        const newUser = new user_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        // Save the new user to the database
        const user = yield newUser.save();
        // send the result
        res.status(201).json(user);
    }
    catch (error) {
        // Handle any errors
        console.error('Error creating user:', error);
        res.status(500).json('Error creating user');
    }
});
exports.createUser = createUser;
// getting the logged in user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                error: '400',
                message: 'Please provide email and password',
            });
        }
        // Find user by email
        const user = yield user_1.default.findOne({ email: email })
            .populate({
            path: 'channels',
            populate: {
                path: 'mixTapes',
                model: 'MixTape',
            },
        })
            .exec();
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                error: '404',
                message: 'User not found.',
            });
        }
        // Compare passwords
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        // If password is invalid, return unauthorized status
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ error: '401', message: 'Username or password is incorrect' });
        }
        // if everything correct, send the user
        res.status(200).json(user);
    }
    catch (error) {
        // console.error('Error logging in user:', error);
        res.status(500).json('Error logging in user');
    }
});
exports.login = login;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { userName, email, password, profilePic, channels, mixTapes } = req.body;
        if (!email || !userName) {
            return res.status(400).json({
                error: '400',
                message: 'Please provide email and username',
            });
        }
        if (!password) {
            const updatedUser = yield user_1.default.findOneAndUpdate({ _id: id }, {
                $set: {
                    userName: userName,
                    email: email,
                    profilePic: profilePic,
                    channels: channels,
                    mixTapes: mixTapes,
                },
            }, { new: true });
            res.status(201).send(updatedUser);
        }
        else {
            const hash = yield bcrypt_1.default.hash(password, 10);
            const hashedPassword = hash;
            const updatedUser = yield user_1.default.findOneAndUpdate({ _id: id }, {
                $set: {
                    userName: userName,
                    email: email,
                    password: hashedPassword,
                    profilePic: profilePic,
                    channels: channels,
                    mixTapes: mixTapes,
                },
            }, { new: true });
            res.status(201).send(updatedUser);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.json({
            message: 'An unexpected error occurred while editing the user. Please try again later.',
        });
    }
});
exports.editUser = editUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_1.default.findOne({ _id: userId }).populate([
            'mixTapes',
            'channels',
        ]);
        if (!user) {
            res.status(401).json({ message: 'No user found.' });
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.json({
            message: 'An unexpected error occurred while getting the user. Please try again later.',
        });
    }
});
exports.getUserById = getUserById;
exports.default = { createUser: exports.createUser, login: exports.login, editUser: exports.editUser };
