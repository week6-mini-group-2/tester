const jwt = require("jsonwebtoken");
require("dotenv").config();

class jsonwebtoken {
  // Access Token 생성
  createAccessToken = async (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
  };

  // Refresh Token 생성
  createRefreshToken = async (userId) => {
    return jwt.sign({id:userId}, process.env.SECRET_KEY, { expiresIn: "7d" });
  };

  // Access Token 검증
  validateAccessToken = async (accessToken) => {
    try {
      // jwt.verify(accessToken, process.env.SECRET_KEY); 
      return jwt.verify(accessToken, process.env.SECRET_KEY); 
    } catch (error) {
      return false;
    }
  };

  // Refresh Token 검증
  validateRefreshToken = async (refreshToken) => {
    try {
      // jwt.verify(refreshToken, process.env.SECRET_KEY); 
      
      return jwt.verify(refreshToken, process.env.SECRET_KEY); 
    } catch (error) {
      return false;
    }
  };
}

module.exports = jsonwebtoken;
