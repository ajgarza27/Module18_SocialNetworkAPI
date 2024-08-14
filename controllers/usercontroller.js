const { Types: { ObjectId } } = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

// Helper Functions
const handleError = (res, err, statusCode = 400) => {
    console.error(err);
    res.status(statusCode).json(err);
};

const handleNotFound = (res, message) => {
    res.status(404).json({ message });
};

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            handleError(res, err, 500);
        }
    },

    createNewUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            handleError(res, err);
        }
    },

    getSingleUser: async (req, res) => {
        const { id: userId } = req.params;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        try {
            const user = await User.findById(userId)
                .populate("thoughts")
                .populate("friends");

            if (!user) {
                return handleNotFound(res, "No user found with this id!");
            }

            res.json(user);
        } catch (err) {
            console.error("Error in getSingleUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    updateSingleUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                return handleNotFound(res, "No user found with this id!");
            }
            res.json(updatedUser);
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteUser: async (req, res) => {
        const { id: userId } = req.params;
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return handleNotFound(res, "No user found with this id!");
            }
            await Thought.deleteMany({ username: user.username });
            res.json({ message: "User and their thoughts deleted successfully!" });
        } catch (err) {
            handleError(res, err, 500);
        }
    },

    addFriend: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            );
            if (!user) {
                return handleNotFound(res, "No user found with this id!");
            }
            res.json(user);
        } catch (err) {
            handleError(res, err);
        }
    },

    removeFriend: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            );
            if (!user) {
                return handleNotFound(res, "No user found with this id!");
            }
            res.json(user);
        } catch (err) {
            handleError(res, err);
        }
    }
};