const express = require('express')
const router = express.Router()
const {newNote, getNotes, deleteNote} = require('../controllers/note')
router.get('/',getNotes)

router.post('/',newNote)

router.put('/',(req,res)=>{

})

router.delete("/:id", deleteNote);

module.exports = router