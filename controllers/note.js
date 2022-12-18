const Note = require('../models/note')

exports.newNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndRemove(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err.message);
  }
};