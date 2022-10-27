const joi = require('joi');
let jwtService = require("../services/jwt.service");
jwtService = new jwtService();

const UsersService = require('../services/user.service');


const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = joi.object({
  nickname: joi.string().pattern(re_nickname).required(),
  password: joi.string().pattern(re_password).required(),
  confirmPassword: joi.string(),
});


class UsersController {
    usersService = new UsersService();
    
    //모든 유저 정보 보여주기
    getUserInfo = async (req, res, next) => {
        try {
            const userInfo = await this.usersService.findAll();
            res.status(200).json({
                result: userInfo,
                accessToken: req.app.locals.accessToken,
            });
        } catch (error) {
            res.status(401).json({"Message": "모든 유저 정보를 불러오지 못했습니다.", "error": error} )
        }
    };

    getUserInfoById = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userInfo =  await this.usersService.findOneById(userId);
            res.status(200).json({
                result: userInfo,
                accessToken: req.app.locals.accessToken,
            });
        } catch (error) {
            res.status(401).json({"Message": "대상 유저 정보를 불러오지 못했습니다.", "error": error} )
        }
    };
    
    // userSignup
    userSignup = async (req,res,next) => {
        const { nickname, password, confirmPassword } = await userSchema.validateAsync(req.body).catch(e => {
            res.status(400).json({ "ErrorMassge": "입력 정보를 확인해주세요." });    
        });

        // 비밀번호 유효성 검증
        if(password !== confirmPassword){
            res.status(400).json({ "ErrorMassge": "비밀번호가 일치하지 않습니다." });    
        }

        // 회원가입 서비스 로직 호출
        const result = await this.usersService.createUser(nickname, password);
        
        // 중복 닉네임
        if(result.err){ res.status(400).json({ data: "이미 존재하는 닉네임입니다." }); }

        // 정상처리
        res.status(201).json({ data: "회원가입 성공!" });
    }


    // userLogin
    userLogin = async (req,res,next) => {
            
        try {
            const { nickname, password } = await userSchema.validateAsync(req.body).catch(e => {
                res.status(400).json({ "ErrorMassge": "입력 정보를 확인해주세요." });    
            });

            const result = await this.usersService.loginUser(nickname, password);
            if(result.err){ res.status(400).json({ "ErrorMassge": "닉네임 혹은 비밀번호를 확인해주세요." }) }

            const refreshDate = new Date();
            refreshDate.setDate(refreshDate.getDate() + 7);

            // res.cookie("refreshToken", `Bearer ${result.refreshToken}`, {expires: new Date(Date.now() + 3600000 * 24 * 7)});
            // res.cookie('accessToken', `Bearer ${result.accessToken}`, {expires: new Date(Date.now() + 3600000)});
            // res.cookie("accessTokenExpiresIn", 3600000, {expires: new Date(Date.now() + 3600000)});

            res.status(201).json({
                message: "로그인에 성공하였습니다.",
                "accessToken": result.accessToken,
                "refreshToken": result.refreshToken,
                "accessTokenExpiresIn": 360000,
            });
        } catch (error) {
            next(error)
        }
    };

    // userLogout
    userLogout = async (req,res,next)=>{
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(201).json({ data: '로그아웃 되었습니다.' });
    };

    giveAuthority = async (req, res, next) => {
        try {
            const { userId } = req.params;
            await this.usersService.giveAuthority(userId);
            res.status(200).send("userId: " + userId + " 에게 admin 권한을 부여하였습니다.");
        } catch (error) {
            res.status(400).send(error);
        }
    };

    test = async(req, res, next) => {
        req.headers.accessToken = await jwtService.createAccessToken(44);
        req.headers.refreshToken = await jwtService.createRefreshToken(44);
        next();
    };
}

module.exports = UsersController; 