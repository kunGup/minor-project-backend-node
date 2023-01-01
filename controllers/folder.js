const Folder = require('../models/folder')
const User = require('../models/user')
exports.getFolders = async(req, res) => {
  User.findById(req.user._id,(err,user)=>{
    if(!user||err){
      return res.status(400).json(err.message);
    }
    Folder.find({_id:{$in:user.folders}}).sort({ updatedAt: -1 }).populate("notes").exec((err,folders)=>{
      if(err){
        return res.status(400).json(err.message);
      }
      res.status(200).json(folders);
    })
  })
}

exports.newFolder = async (req, res) => {
  try {
    const folder = new Folder(req.body);
    await folder.save()
    User.findById(req.user._id, (err, user) => {
      if (!user || err) {
        return res.status(400).json(err.message);
      }
      user.folders.push(folder._id);
      user.save().then(() => {
        res.status(200).json(folder);
      });
    });
    
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.editFolder = async (req, res) => {
  try {
    const {folderId,noteId,title} = req.body
    console.log(folderId);
    const folder = await Folder.findById(folderId);
    if(title)
    folder.title = title
    if (noteId&&folder.notes.includes(noteId)==false) folder.notes.push(noteId)
    await folder.save()
    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const {id} = req.params
    const folder = await Folder.findByIdAndRemove(id);
    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};