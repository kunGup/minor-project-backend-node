const Note = require('../models/note')
const User = require('../models/user')

exports.newNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    User.findById(req.user._id,(err,user)=>{
      if(!user||err){
        return res.status(400).json(err.message);
      }
      user.notes.push(note._id)
      user.save().then(()=>{
        res.status(200).json(note);
      })
    })
    
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getNotes = async (req, res) => {
  User.findById(req.user._id,(err,user)=>{
    if (!user || err) {
      return res.status(400).json(err.message);
    }
    Note.find({ _id: { $in: user.notes } }).sort({ updatedAt: -1 }).exec((err,notes)=>{
      if(err){
        return res.status(400).json(err.message);
      }
      return res.status(200).json(notes);
    })
  })
};

exports.editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id,req.body);
    res.status(200).json(note);
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