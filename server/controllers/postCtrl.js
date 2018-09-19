const postService  = require('../service/postService.js');

const getAllPosts = async function(ctx){
    try{
        var result = await postService.getAllPosts(ctx.params);
        var count = await postService.getPostCount(ctx.params);
        ctx.body = {
            success: true,
            data:{
                total: count,
                data: result,
            }
        }
    }catch(err){
        ctx.body = {
            success: false,
            info: err.message
        }
    }
}

const addPost = async function(ctx){
    const result = await postService.addPost(ctx.request.body);
    if(result){
        ctx.body = {
            success: true,
            info: '成功！',
            data:''
        }
    }else{
        ctx.body = {
            success: false,
            info: '添加失败'
        }
    }
}

const getPostDetail = async function(ctx){
    const queryParams = {
        _id: ctx.params.postId
    }
    const result  = await postService.getPostDetail(queryParams);
    postService.updatePostViews(queryParams);
    if(result){
        ctx.body = {
            success: true,
            info: '成功！',
            data:result
        }
    }else{
        ctx.body = {
            success: false,
            info: '查询失败'
        }
    }
}

const removePost = async function(ctx){
    const result  = await postService.removePost(ctx.params.postId);
    if(result){
        ctx.body = {
            success: true,
            info: '成功！',
            data:result
        }
    }else{
        ctx.body = {
            success: false,
            info: '删除失败'
        }
    }
}
module.exports = {
    getAllPosts,
    addPost,
    getPostDetail,
    removePost
}