const mongoose = require('mongoose')
const folderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
},{timestamps:true})
module.exports = mongoose.model('Folder',folderSchema)