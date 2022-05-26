const express = require("express");
const router = express.Router();
const listController = require('../controllers/files.controllers')

router.get("/data", listController.dataList)
router.get("/list", listController.getList)

module.exports = router;