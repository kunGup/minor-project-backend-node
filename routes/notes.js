const express = require('express')
const router = express.Router()
const {newNote, getNotes} = require('../controllers/note')
router.get('/',getNotes)

router.post('/',newNote)

router.put('/',(req,res)=>{

})

router.delete('/',(req,res)=>{

})

module.exports = router