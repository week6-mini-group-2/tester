const RanksRepository = require('../repositories/rank.repository');
const UsersRepository = require('../repositories/user.repository');

class RanksService {
    ranksRepository = new RanksRepository();
    usersRepository = new UsersRepository();

    // getRank
    getUsersRankAndScore = async(userId, categoryId) => {
        return await this.ranksRepository.getUsersRankAndScore(userId, categoryId);
    };

    getRanksByCategory = async(categoryId) => {
        return await this.ranksRepository.getRanksByCategory(categoryId);
    };

    // updateScore
    updateScore = async(userId, categoryId, newScore) => {
        return await this.ranksRepository.updateScore(userId, categoryId, newScore);
    };

    deleteRankAndScore = async(rankId) => {
        return await this.ranksRepository.deleteRankAndScore(rankId);
    };

    deleteRankAndScoreByAdmin = async(rankId) => {
        return await this.ranksRepository.deleteRankAndScoreByAdmin(rankId);
    }
    // createRankAndService
    createRankAndScore = async(userId, categoryId) => {
        return await this.ranksRepository.createRankAndScore(userId, categoryId)
    }
}

module.exports = RanksService;