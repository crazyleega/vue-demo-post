var Post = require("../schema/post")
var Tag = require("../schema/tag")

const getAllPosts = async function(params){
    let key = params.key ? params.key : 'all',
        pageNum = params.pageNum ? parseInt(params.pageNum) : 1,
        pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
    let skip = pageNum === 1 ? 0 : (pageNum - 1) * pageSize ;
    let queryObj = {
        status: 1,
    }
    if(key !== 'all'){
        let tag = await Tag.findOne({key:key});
        queryObj.tags = tag._id;
    }
    return Post.find(queryObj).skip(skip).limit(pageSize).sort({createdAt:-1});
}

const getPostCount = async function(params){
    let key = params.key ? params.key : 'all',
        queryObj = {
            status: 1,
        }
    if(key !== 'all'){
        let tag = await Tag.findOne({key:key});
        queryObj.tags = tag._id;
    }
    return Post.count(queryObj);
}

const addPost = function(obj){
    console.log(obj);
    var post = new Post(obj);
    return post.save();
}

const getPostDetail = function(params){
    return Post.findOne(params)
}

const removePost = function(postId){
    return Post.update({_id:postId},{$set:{status:0}});
}

const updatePostViews = function(obj){
   return new Promise((resolve,reject) => {
         Post.update({_id:obj._id},{$inc:{views:1}},function(err,result){
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        });
    }) 
}

const addCommentCount = function(postId){
    return Post.update({_id:postId},{$inc:{comments:1}});
}

module.exports  = {
    getAllPosts,
    addPost,
    getPostDetail,
    removePost,
    updatePostViews,
    getPostCount,
    addCommentCount
}