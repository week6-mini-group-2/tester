const { Comments } = require('../models');

class CommentsRepository{
    createComment = async(userId, postId, comment) => {
        const commentInfo = await Comments.create({
            userId,
            postId,
            comment,
            editCheck: false
        });
        return commentInfo.commentId;
    };

    getAllComment = async({postId})=>{
        const findValue = await Comments.findAll({postId})
        return findValue
    }
    
    updateComment = async(commentId, comment) => {
        const updateValue = await Comments.update(
            {comment : comment, editCheck: true} ,
            {where: {commentId : commentId}},
        );
        return updateValue;
    };
    deleteComment = async(commentId) => {
        return await Comments.destroy({where: {commentId: commentId}});
    };

    deleteCommentByAdmin = async(commentId) => {
        const { userId } = res.locals.user;
        const sourceUserInfo = await Users.findOne({where: {userId: userId}});
        if(!sourceUserInfo.isAdmin){
            return {result: false, message: "권한이 없습니다."};
        }else{
            return await Comments.destroy({where: {commentId: commentId}});
        }
    };

}


module.exports = CommentsRepository;