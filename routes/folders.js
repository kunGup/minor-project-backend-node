const express = require("express");
const { requireSignin, isAuth } = require("../controllers/auth");
const router = express.Router();
const {getFolders,newFolder,deleteFolder,editFolder} = require('../controllers/folder')



router.get("/", requireSignin, isAuth, getFolders);

router.post("/", requireSignin, isAuth, newFolder);

router.put("/", requireSignin, isAuth, editFolder);

router.delete("/:id", requireSignin, isAuth, deleteFolder);

module.exports = router;
