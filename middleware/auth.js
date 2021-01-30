import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500; //Whether it's google oauth or normal login if it's greater than 500 then google OAuth else it's normal login

    let decodedData;
    // CUSTOM AUTH
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    // OAUTH LOGIN
    else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
