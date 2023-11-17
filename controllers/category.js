const category = require('../models/category');


const getCategories = async (req, res) => {
    const searchTerm = req.params.name || ".*";
    try {
        const result = await category.find({name: { $regex: searchTerm, $options: 'i' }});
        res.status(200).json({ success: true, data: result });
    }catch(err){
        res.status(500).json({ success: false, data: [], error: err });
    }
}

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try{
        await category.deleteOne({_id: id});
        res.status(200).json({success: true, data: []});
    }catch(err){
        res.status(500).json({success: false, data: [], error: err});
    }
}
const updateCategory = async (req, res) => {
    const id = req.params.id;
    try{
        await category.updateOne({_id: id},{$set: req.body});
        const updatedCategory = await category.find({_id: id});
        res.status(201).json({success: true, data: updatedCategory});
    }catch(err){
        res.status(500).json({success: false, data: [], error: err});
    }
}

const addCategory = async (req, res) => {
    try{
        const {name, description, colorCode} = req.body;
        const newCategory = new category({
            name: name,
            description: description,
            colorCode: colorCode
        });
        const saveCategory = await newCategory.save();
        res.status(201).json({success: true, data: saveCategory});
    }catch(err){
        res.status(500).json({success: false, data: [], error: err});
    }
}

module.exports = {
    getCategories,
    deleteCategory,
    updateCategory,
    addCategory
}