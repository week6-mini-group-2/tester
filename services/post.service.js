const PostsRepository = require('../repositories/post.repository');
const RanksRepository = require('../repositories/rank.repository');

class PostsService {
    postsRepository = new PostsRepository();
    ranksRepository = new RanksRepository();

    // createPosts
    createPost = async (userId, categoryId, imageUrl, title, content) => {
        try {
            // 게시글 생성
            const rankInfoExists = await this.ranksRepository.isRankInfoExistInUser(userId, categoryId);
            if(!rankInfoExists){
                await this.ranksRepository.createRankAndScore(userId, categoryId);
            }

            return await this.postsRepository.createPost(userId, categoryId, imageUrl, title, content);

        } catch (error) {
            throw new Error(error);
        }
    
    };

    //모든 게시글 조회
    getAllPosts = async () => {
        return await this.postsRepository.getAllPosts();
    };

   //상세페이지
    getDetailPost = async (postId) => {
        await this.postsRepository.lookup(postId)
        return await this.postsRepository.getPostById(postId);
    };

    getPostsByCategory = async (categoryId) => {
        return await this.postsRepository.getPostsByCategory(categoryId);
    }

    // 포스트 수정
    updatePost = async (postId, title, content, imageUrl) => {
        return await this.postsRepository.updatePost(postId, title, content, imageUrl)
    };
        //포스트 삭제
    deletePost = async (postId) => {
       return await this.postsRepository.deletePost(postId);
    };

    deletePostByAdmin = async(postId) => {
        return await this.postsRepository.deletePostByAdmin(postId);
    }

    
}

module.exports = PostsService;