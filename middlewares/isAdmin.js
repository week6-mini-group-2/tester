let jwtService = require("../services/jwt.service");
let UsersRepository = require('../repositories/user.repository');
jwtService = new jwtService();

const usersRepository = new UsersRepository();


module.exports = async (req, res, next) => {
    try {
        // let accessToken = req.cookies['accessToken'];
        const accessToken = req.headers['accesstoken'] || req.headers['accessToken'];
        
        if(!accessToken){res.status(401).send("로그인이 필요합니다.")
        } else {
            let userId = await jwtService.validateAccessToken(accessToken.split(' ')[1]);
            const userInfo = await usersRepository.findOneById(userId.id);
            if(!userInfo.isAdmin){
                res.status(401).json({"message": "접근 권한이 없습니다."});
            }
            next();
        };
    } catch (error) {
        res.status(400).send(error)
    }
}