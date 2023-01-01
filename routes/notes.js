const express = require('express');
const { requireSignin, isAuth } = require('../controllers/auth');
const router = express.Router()
const {newNote, getNotes, deleteNote, editNote} = require('../controllers/note')
router.get('/',requireSignin, isAuth,getNotes)

router.post("/", requireSignin, isAuth, newNote);

router.put("/:id", requireSignin, isAuth, editNote);

router.delete("/:id", requireSignin, isAuth, deleteNote);

module.exports = router