const express = require("express");
const router = express.Router();
const {getFolders,newFolder,deleteFolder,editFolder} = require('../controllers/folder')



router.get("/", getFolders);

router.post("/", newFolder);

router.put("/", editFolder);

router.delete("/:id", deleteFolder);

module.exports = router;
