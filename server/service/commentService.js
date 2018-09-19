const Comment = require('../schema/comment')
const User = require('../schema/user')

const addComment = async (params) => {
    var comment = new Comment(params);
    return comment.save(params);
}

const getCommentsByPostId = async (params) => {
    console.log(params);
    let pageNum = params.pageNum ? parseInt(params.pageNum) : 1,
        pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
    let skip = pageNum === 1 ? 0 : (pageNum - 1) * pageSize ;
    let queryObj = {
        status: 1,
        parent_id: params.postId
    };
    // Comment.find(queryObj).skip(skip).limit(pageSize).sort({createdAt:-1});
    return new Promise((resolve,reject) => {
        Comment.find(queryObj,'',{sort:{createdAt: -1}},(error,result) => {
            if(error){
                reject(error);
            }else{
                if(result.length == 0){
                  resolve(result);
                }else{
                  for(let i = 0; i < result.length; i++){
                    (function(j){
                        User.findOne({_id:result[j].from},(error,data) => {
                            if(data){
                                result[j].userInfo = data
                            }
                            if(j === result.length -1){
                                resolve(result);
                            }
                        })
                    })(i)
                  }
                }
            }
        })

    })
}

const getCommentCount = async function(params){
    return Comment.count({
        status: 1,
        parent_id: params.postId
    });
}
module.exports = {
    addComment,
    getCommentsByPostId,
    getCommentCount,
}