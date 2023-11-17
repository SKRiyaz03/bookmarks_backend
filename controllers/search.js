const Bookmark = require("../models/bookmark");
const Category = require("../models/category");
const search = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        
        const bookmarksWithCategories = await Bookmark.aggregate([
          {
            $match: {
              $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { tag: { $regex: searchQuery, $options: 'i' } }
              ]
            }
          },
          {
            $lookup: {
              from: 'categories', // Use the correct name of the "categories" collection
              let: { tagValue: '$tag' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [ { $toLower: '$name' }, { $toLower: '$$tagValue' } ]
                    }
                  }
                }
              ],
              as: 'categoryInfo'
            }
          },
          {
            $unwind: '$categoryInfo'
          },
          {
            $project: {
              title: 1,
              url: 1,
              tag: 1,
              description: 1,
              'categoryInfo.name': 1,
              'categoryInfo.description': 1,
              'categoryInfo.colorCode': 1
            }
          }
        ]);
    
        res.status(200).json({ success: true, data: bookmarksWithCategories });
      } catch (err) {
        res.status(500).json({ success: false, data: [], error: err.message });
      }
};

module.exports = search;
