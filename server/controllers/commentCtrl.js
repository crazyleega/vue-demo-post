const commentService = require('../service/commentService')
const postService = require('../service/postService')

const addComment = async (ctx) =>{
    const result = await commentService.addComment(ctx.request.body);
    await postService.addCommentCount(ctx.request.body.parent_id)
    if(result){
        ctx.body = {
            success: true,
            data:'',
        }
    }else{
        ctx.body = {
            success: false,
            data:'',
        }
    }
    
}

const getCommentsByPostId = async (ctx) => {
    const result = await commentService.getCommentsByPostId(ctx.params);
    const total = await commentService.getCommentCount(ctx.params);
    if(result){
        ctx.body = {
            success: true,
            data: result,
            total: total,
        }
    }else{
        ctx.body = {
            success: false,
            data:[],
        }
    }
}


module.exports = {
    addComment,
    getCommentsByPostId,
}