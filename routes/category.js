const express = require("express");
const { getCategories, deleteCategory, updateCategory, addCategory } = require("../controllers/category");

router = express();

router.get('/',getCategories);
router.post('/add',addCategory);
router.put('/update/:id',updateCategory);
router.delete('/delete/:id',deleteCategory); 


module.exports = router;