const CommentsRepository = require('../repositories/comment.repository');

class CommentsService {
    commentsRepository = new CommentsRepository();

    // createComments
    createComment = async(userId, postId, comment) => {
        return await this.commentsRepository.createComment(userId, postId, comment);
    };

    // deleteComments
    deleteComment = async(commentId) => {
        return await this.commentsRepository.deleteComment(commentId);
    };

    deleteCommentByAdmin = async(commentId) => {
        return await this.commentsRepository.deleteCommentByAdmin(commentId);
    }
    // updateComments
    updateComment = async(commentId, comment) => {
        return await this.commentsRepository.updateComment(commentId, comment);
    };
}



module.exports = CommentsService;