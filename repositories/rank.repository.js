const { Ranks } = require('../models');
const { Users } = require('../models');
class RanksRepository{
    // getRank
    getUsersRankAndScore = async(userId, categoryId) => {
        const userInfo = await Ranks.findAll({
            where: {categoryId: categoryId},
            order: [
                ['score', 'DESC']
            ]
        });
        let myRank = -1;
        let myScore = -1;

        for(let i=0; i<userInfo.length; i++){
            if(userInfo[i].userId == userId){
                myRank = i + 1;
                myScore = userInfo[i].score;
                break;
            }
        }

        if(myRank !== -1 && myScore !== -1){
            return {Rank: myRank, Score: myScore};
        } else {
            return false;
        }
    };
    
    getRanksByCategory = async(categoryId) => {
        return await Ranks.findAll({
            where: {categoryId: categoryId},
            order: [
                ['score', 'DESC']
            ]
        });
    };

    // updateScore
    updateScore = async(userId, categoryId, newScore) => {
        const rankInfo = await Ranks.findOne(
            {where: {userId: userId, categoryId: categoryId}}
        );
        if(!rankInfo){
            return {result: false, message: "해당 랭크 정보가 존재하지 않습니다."};
        }else{
            await Ranks.increment(
                {score: newScore},
                {where: {userId: userId, categoryId: categoryId}}
            );
            return await Ranks.findOne({
                where: {userId: userId, categoryId: categoryId}
            });
        }
    };

    deleteRankAndScore = async(rankId) => {
        const rankInfo = await Ranks.findOne(
            {where: {rankId: rankId}}
        );
        if(!rankInfo){
            return {result: false, message: "해당 랭크 정보가 존재하지 않습니다."};
        }else{
            return await Ranks.destroy({where: {rankId: rankId}});
        }
    };

    deleteRankAndScoreByAdmin = async(targetUserId, rankId) => {
        const { userId } = res.locals.user;
        const sourceUserInfo = await Users.findOne({where: {userId: userId}});
        if(!sourceUserInfo.isAdmin){
            return {result: false, message: "권한이 없습니다."};
        };

        const rankInfo = await Ranks.findOne(
            {where: {rankId: rankId}}
        );

        if(!rankInfo){
            return {result: false, message: "해당 랭크 정보가 존재하지 않습니다."};
        }else{
            return await Ranks.destroy({where: {rankId: rankId}});
        }
    };

    createRankAndScore = async(userId, categoryId) => {
        const rankInfo = await Ranks.findOne(
            {where: {userId: userId, categoryId: categoryId}}
        );
        if(!rankInfo){
            return {result: false, message: "해당 랭크 정보가 존재하지 않습니다."};
        }else{
            return await Ranks.create({
                userId: userId,
                categoryId: categoryId,
                score: 0
            });
        }
    };

    isRankInfoExistInUser = async(userId, categoryId) => {
        const myRank = await Ranks.findOne({where: {userId: userId, categoryId: categoryId}});
        if(myRank){
            return true;
        }else {
            return false;
        }
    };
}

module.exports = RanksRepository;