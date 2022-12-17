const router = require('express').Router()
const {getSummary} = require('../controllers/ytsum')
router.post('/',getSummary)
module.exports=router