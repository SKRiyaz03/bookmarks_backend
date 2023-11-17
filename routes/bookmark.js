const express = require('express');
const {addBookMark, getBookMarks, updateBookMark, deleteBookMark} = require("../controllers/bookmark");

router = express.Router();

router.post("/create", addBookMark);
router.get("/get", getBookMarks);
router.put("/update/:id", updateBookMark);
router.delete("/delete/:id", deleteBookMark);

module.exports = router;
