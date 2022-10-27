const { Users,sequelize,Sequelize } = require('../models');
const { Ranks } = require('../models')
class UsersRepository{
    constructor(){
        this.Users = Users;
        this.sequelize = sequelize;
        this.Sequelize = sequelize;
    };

    findAll = async () => {
        return await this.Users.findAll({
            include: [{
                model: Ranks
            }]
        });
    };

    // findOneById
    findOneById = async (userId) => {
        return await this.Users.findOne({
            where : {userId: userId},
            include: [{
                model: Ranks
            }]
            },
        );
    };
    
    // createUser
    signup = async(nickname, encrpytedPassword) => {

        const userInfo = await this.Users.create({
            nickname,
            password:encrpytedPassword
        });

        return {msg: "new User created"};
    };

    // findUser
    findUser = async (nickname) => {

        const Query = `
            SELECT * 
            FROM Users
            WHERE nickname='${nickname}'
        `;

        try{
            return await this.sequelize.query(Query,{type:Sequelize.QueryTypes.SELECT,});
        }catch(e){
            return 'USER SELECT ERROR !'
        }
    };

    updateRefreshToken = async (userId,refreshToken) => {

        const Query = `
            UPDATE Users
            SET refreshToken = '${refreshToken}'
            WHERE userId = ${userId} 
        `;

        return await this.sequelize.query(Query,{type:Sequelize.QueryTypes.UPDATE,});
    };

    giveAuthority = async(userId) => {
        const userInfo = await this.Users.findOne({where : {userId: userId}});
        let adminStat = false;
        if(!userInfo.isAdmin){adminStat = true};

        return await this.Users.update(
            {isAdmin: adminStat},
            {where: {userId: userId}}
        );
    };
}

module.exports = UsersRepository;