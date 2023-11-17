const Bookmark = require('../models/bookmark')

const addBookMark = async (req, res) => {
    try{
        const {title, url, tag, description} = req.body;
        
        const bookmark = new Bookmark({title, url, tag, description});
        const saveBookmark = await bookmark.save();
        res.status(201).json({success: true, data: saveBookmark});
    }catch(err){
        res.status(500).json({success: false, data: [], error: error});
    }
}


const getBookMarks = async (req, res) => {
    try {
        const searchTerm = req.query.search || ".*"; // Default to ".*" if search is not provided
        const tag = req.query.tag || ".*"; // Default to ".*" if category is not provided

        const result = await Bookmark.find({ title: { $regex: searchTerm, $options: 'i' }, tag: { $regex: tag, $options: 'i' } });
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, data: [], error: err });
    }
}


const updateBookMark = async(req, res) => {
    try {
        const id = req.params.id;
        const newBookMark = {
            title: req.body.title,
            url: req.body.url,
            tag: req.body.tag,
            description: req.body.description
        }
        await Bookmark.updateOne({_id: id},{$set: newBookMark});
        const updatedBookmark = await Bookmark.find({_id: id});
        res.status(200).json({success: true, data: updatedBookmark});
    }catch(err){
        res.status(500).json({success: false, data: [], error: err});
    }
}


const deleteBookMark = async(req, res) => {
    console.log("Deleted");
    const id = req.params.id;

    try{
        await Bookmark.deleteOne({_id: id});
        res.status(200).json({success: true, data: []});
    }catch(err){
        res.status(500).json({success: false, data: [], error: err});
    }
}


module.exports = {
    addBookMark,
    getBookMarks,
    updateBookMark,
    deleteBookMark
}
