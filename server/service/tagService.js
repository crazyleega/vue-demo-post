const Tag = require('../schema/tag.js')

const getAllTags = async () => {
    return Tag.find().sort({key:1,createdAt:-1})
}

const addTag = async (tagObj) => {
    const tag = new Tag(tagObj);
    return tag.save();
} 

module.exports = {
    getAllTags,
    addTag,
}