const { Posts } = require('../models');
const { Comments } = require('../models');
const { Users } = require('../models');
class PostsRepository{

    getAllPosts = async() => {
        return await Posts.findAll({
            include: [{
                model: Comments
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    getPostById = async(postId) => {
        return await Posts.findOne({
            where : {postId: postId},
            include: [{
                model: Comments
            }]
        });
    };
    
    getPostsByCategory = async(categoryId) => {
        return await Posts.findAll({
            where: {categoryId: categoryId},
            include: [{
                model: Comments
            }]
        });
    };

    //조회수 증가
    lookup = async(postId)=>{
        return await Posts.increment({lookup : 1},{where : {postId: postId}})
    }

    createPost = async(userId, categoryId, imageUrl, title, content) => {
        return await Posts.create({
            userId: userId,
            categoryId: categoryId,
            title: title,
            content: content,
            imageUrl: imageUrl,
            lookup:0
        });

        
    };

    updatePost = async(postId, title, content, imageUrl) => {
        return await Posts.update(
            {title : title, content: content, imageUrl: imageUrl} ,
            {where: {postId: postId}},
        );
    };

    deletePost = async(postId) => {
        return await Posts.destroy({where: {postId: postId}});
      
    };

    deletePostByAdmin = async(postId) => {
        const { userId } = res.locals.user;
        const sourceUserInfo = await Users.findOne({where: {userId: userId}});
        if(!sourceUserInfo.isAdmin){
            return {result: false, message: "권한이 없습니다."};
        }else{
            return await Posts.destroy({where: {postId: postId}});
        }
    }
}

module.exports = PostsRepository;