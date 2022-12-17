const Folder = require('../models/folder')

exports.getFolders = async(req, res) => {
    try{
        const folders = await Folder.find().sort({'updatedAt':-1})
        res.status(200).json(folders)
    }catch(err){
        res.status(400).json(err.message)
    }
}

exports.newFolder = async (req, res) => {
  try {
    const folder = new Folder(req.body);
    await folder.save()
    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.editFolder = async (req, res) => {
  try {
    const {folderId,noteId,title} = req.body
    const folder = await Folder.findById(folderId);
    if(title)
    folder.title = title
    if (noteId&&folder.notes.find(noteId)==false) folder.notes = [...notes,noteId];
    await folder.save()
    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.body.id);
    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};