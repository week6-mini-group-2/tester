const bcrypt = require("bcrypt");
require('dotenv').config();

let jwtService = require("./jwt.service");
const UsersRepository = require('../repositories/user.repository');

class UsersService {
    usersRepository = new UsersRepository();
    jwtService = new jwtService();

    findAll = async () => {
        return await this.usersRepository.findAll();
    }

    findOneById = async(userId) => {
        return await this.usersRepository.findOneById(userId);
    };

    findOneByNickname = async(nickname) => {
        return await this.usersRepository.findUser(nickname);
    };

    // createUser
    createUser = async (nickname, password) => {
        try {
            // 중복유저 검색
            const findUser = await this.usersRepository.findUser(nickname);

            // 닉네임 중복이면 false 반환
            if(findUser.length){ return { err : 'nicknameOverlap'} }

            // 비밀번호 암호화
            const salt = bcrypt.genSaltSync(Number(process.env.SALT));
            const encrpytedPassword = bcrypt.hashSync(password, salt);
            // 유저 등록
            const signup = await this.usersRepository.signup(nickname,encrpytedPassword);

            return signup;
        } catch (error) {
            return error
        }
    }

    // loginUser
    loginUser = async (nickname, password) => {
        // 로그인 유효성 검증을 위해 유저 검색
        const [findUser] = await this.usersRepository.findUser(nickname);
        // 유저 정보 없는 경우
        if(!findUser){ throw new Error('일치하는 유저 정보가 존재하지 않습니다.') };
        // 비밀번호 일치 여부
        const match_password = bcrypt.compareSync(password,findUser.password);
        if(!match_password){ throw new Error('비밀번호가 일치하지 않습니다.') }
        
        // Token 생성
        const accessToken = await this.jwtService.createAccessToken(findUser.userId);
        const refreshToken = await this.jwtService.createRefreshToken(findUser.userId);
        await this.usersRepository.updateRefreshToken(findUser.userId, refreshToken); 

        // refreshToken 암호화
        const hash_refreshToken = bcrypt.hashSync(refreshToken, 5);
        
        // refreshToken db 저장
        return {accessToken: accessToken, refreshToken: hash_refreshToken};
    };

    giveAuthority = async(userId) => {
        return await this.usersRepository.giveAuthority(userId);
    };
}

module.exports = UsersService;