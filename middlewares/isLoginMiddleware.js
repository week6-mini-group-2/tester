// 로그인 되어 있는 유저일 경우 Error를 반환한다.
exports.isLogout = (req, res, next) => {
  try {
    // const cookies = req.cookies['accessToken'];
    const cookies = req.headers['accesstoken'] || req.headers['accessToken'];
    if (cookies) {
      return res.status(403).send({
        errorMessage: '이미 로그인이 되어있습니다.',
      });
    }

    next();
    
  } catch (error) {
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
};

exports.isLogin = (req, res, next) => {
  try {
    // const cookies = req.cookies['accessToken'];
    const cookies = req.headers['accesstoken'] || req.headers['accessToken'];
    if (!cookies) {
      return res.status(403).send({
        errorMessage: '로그인이 필요합니다.',
      });
    }

    next();

  } catch (error) {
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
}