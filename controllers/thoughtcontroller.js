const { Types: { ObjectId } } = require("mongoose");
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
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedThought) {
                return handleNotFound(res, "No thought found with this id!");
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(res, err);
        }
    },

    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            handleError(res, err, 500);
        }
    },

    getSingleThought: async (req, res) => {
        const { thoughtId } = req.params;
        if (!ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ message: "Invalid thought ID" });
        }

        try {
            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return handleNotFound(res, "No thought found with this ID!");
            }
            res.json(thought);
        } catch (err) {
            handleError(res, err, 500);
        }
    },

    postReaction: async (req, res) => {
        const { thoughtId } = req.params;
        if (!ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ message: "Invalid thought ID" });
        }

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!updatedThought) {
                return handleNotFound(res, "No thought found with this ID!");
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteReaction: async (req, res) => {
        const { thoughtId, reactionId } = req.params;
        if (!ObjectId.isValid(thoughtId) || !ObjectId.isValid(reactionId)) {
            return res.status(400).json({ message: "Invalid thought or reaction ID" });
        }

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );
            if (!updatedThought) {
                return handleNotFound(res, "No thought found with this ID!");
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteThought: async (req, res) => {
        const { thoughtId } = req.params;
        try {
            const thought = await Thought.findByIdAndDelete(thoughtId);
            if (!thought) {
                return handleNotFound(res, "No thought found with this ID!");
            }
            res.json({ message: "Thought successfully deleted!" });
        } catch (err) {
            handleError(res, err, 500);
        }
    }
};