const RanksService = require('../services/rank.service');

class RanksController {
    ranksService = new RanksService();

    // 
    createRankAndScore = async(req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { categoryId } = req.params;

            const myRank = await this.ranksService.createRankAndScore(userId, categoryId);

            res.status(200).json({result: myRank, accessToken: req.app.locals.accessToken,});
        } catch (error) {
            res.status(400).send(error);
        }
    };
    // 
    deleteRankAndScore = async(req, res, next) => {
        try {
            const { rankId } = req.params;
            const deleteValue = await this.ranksService.deleteRankAndScore(rankId);
            res.status(200).json({result: deleteValue, accessToken: req.app.locals.accessToken,});    
        } catch (error) {
            res.status(400).send(error);
        }
    };

    deleteRankAndScoreByAdmin = async(req, res, next) => {
        try {
            const { rankId } = req.params;
            const deleteValue = await this.ranksService.deleteRankAndScoreByAdmin(rankId);
            res.status(200).json({result: deleteValue, accessToken: req.app.locals.accessToken,});    
        } catch (error) {
            res.status(400).send(error);
        }
    };
    // 
    updateScore = async(req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { newScore } = req.body;
            const { categoryId } = req.params;

            const updateValue = await this.ranksService.updateScore(userId, categoryId, newScore);
            res.status(200).json({result: updateValue, accessToken: req.app.locals.accessToken,});    
        } catch (error) {
            res.status(400).send(error);
        }
    };

    getUsersRankAndScore = async(req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { categoryId } = req.params;

            const myRank = await this.ranksService.getUsersRankAndScore(userId, categoryId);
            res.status(200).json({result: myRank, accessToken: req.app.locals.accessToken,});

        } catch (error) {
            res.status(400).send(error);
        }
    };

    getRanksByCategory = async(req, res, next) => {
        try {
            const { categoryId } = req.params;

            const myRank = await this.ranksService.getRanksByCategory(categoryId);
            res.status(200).json({result: myRank, accessToken: req.app.locals.accessToken,});

        } catch (error) {
            res.status(400).send(error);
        }
    };
}

module.exports = RanksController;