const express = require('express');
const router = express.Router();
const { getAllThoughts, createThought, getSingleThought, updateThought, deleteThought, postReaction, deleteReaction } = require('../../controllers/thoughtController');

// Routes for thoughts
router.get('/', getAllThoughts);
router.post('/', createThought);

// Routes for a specific thought
router.get('/:thoughtId', getSingleThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

// Routes for reactions on a specific thought
router.post('/:thoughtId/reactions', postReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;