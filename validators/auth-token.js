import jwt from 'jsonwebtoken';
import session from 'express-session';

const authHeaderToken = async (req, res, next) => {
  try {
    const allowedRoutesWithoutToken =  process.env.AllowedRoutes;   
    const officedshtoken='http://localhost:3000/api/v1/getofficerdashboard';
    if (allowedRoutesWithoutToken.includes(req.path)) {      
      return next();
    }
    if(officedshtoken.includes(req.path))
    {
      if(!req.headers.authorization)
      {
        return next();
      }
      else
      {
        const token = req.headers.authorization.split(" ")[1];
       // console.log("Token-> : "+token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ status: false, message: "The authentication token you provided has expired. Please obtain a new token by signing in again or renewing your session if applicable. If you believe this is an error, please contact support for assistance. Thank you." });
            } else {
              return res.status(401).json({ status: false, message: "The authentication token you provided is invalid. Please ensure you're providing a valid token and try again. If you're experiencing issues with authentication, please contact support for assistance. Thank you." });
            }
          } else {
            req.user = decodedToken;
            req.session.user = {
              id: req.user.id,
              LoginId: req.user.loginId,
              // ... any other values you want to store
            };
            //req.session.loginId = req.user.loginId;
           // console.log(req.session.user)
            next();
          }
        });
      }
    
      
    }
    else{
    if (!req.headers.authorization) {
      return res.status(401).json({ status: false, message: "To access this API endpoint, you need to provide an authentication token. Please include your token in the request headers under the 'Authorization' header." });
    }
    
    const token = req.headers.authorization.split(" ")[1];
   // console.log("Token-> : "+token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ status: false, message: "The authentication token you provided has expired. Please obtain a new token by signing in again or renewing your session if applicable. If you believe this is an error, please contact support for assistance. Thank you." });
        } else {
          return res.status(401).json({ status: false, message: "The authentication token you provided is invalid. Please ensure you're providing a valid token and try again. If you're experiencing issues with authentication, please contact support for assistance. Thank you." });
        }
      } else {
        req.user = decodedToken;
        req.session.user = {
          id: req.user.id,
          LoginId: req.user.loginId,
          // ... any other values you want to store
        };
        //req.session.loginId = req.user.loginId;
       // console.log(req.session.user)
        next();
      }
    });
  }} catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


export default authHeaderToken