const PostsService = require('../services/post.service');

class PostsController {
    postsService = new PostsService();

    // createPosts
    createPost = async (req, res, next) => {
        try {
            const { categoryId, imageUrl, title, content } = req.body;
            const { userId } = res.locals.user;
            res.json({
                body: req.body,
                userId: userId
            });
            
            // post 작성 -> 작성 성공 시 postId 반환
            await this.postsService.createPost(userId, categoryId, imageUrl, title, content);

            res.status(201).json({ "message": "게시글 작성에 성공하였습니다.", accessToken: req.app.locals.accessToken, });
        } catch (error) {
            res.status(400).json({ "message": "게시글 작성에 실패하였습니다." , "error": error});
        }
    }


    //모든 게시물 조회
    getAllPosts = async (req, res, next) => {
        const result = await this.postsService.getAllPosts();
        res.status(200).json({ result: result, accessToken: req.app.locals.accessToken, });
    }

    //상세페이지
    getDetailPost = async (req, res, next) => {
        const {postId} = req.params;
        const postOne = await this.postsService.getDetailPost(postId);

        res.status(200).json({ result: postOne, accessToken: req.app.locals.accessToken, });
    }

    getPostsByCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        const postsByCategory = await this.postsService.getPostsByCategory(categoryId);
        res.status(200).json({ result: postsByCategory, accessToken: req.app.locals.accessToken, });
    }


    //게시글 수정
    updatePost = async (req, res, next) => {
        const { title, content, imageUrl } = req.body;
        const { postId } = req.params;
        const { userId } = res.locals.user;
        await this.postsService.updatePost(userId, postId, title, content, imageUrl)
        res.status(201).json({ "message": "게시글 수정에 성공하였습니다", accessToken: req.app.locals.accessToken, });

    }
    //게시글 삭제 async ({ })
    deletePost = async (req, res, next) => {
        const { postId } = req.params
        const { userId } = res.locals.user

        await this.postsService.deletePost(postId, userId)
        res.status(201).json({ "message": "게시글 삭제에 성공하였습니다", accessToken: req.app.locals.accessToken, });
    };

    deletePostByAdmin = async (req, res, next) => {
        const { postId } = req.params
        const { userId } = res.locals.user

        await this.postsService.deletePostByAdmin(postId, userId)
        res.status(201).json({ "message": "게시글 삭제에 성공하였습니다", accessToken: req.app.locals.accessToken, });
    }

}
module.exports = PostsController;
