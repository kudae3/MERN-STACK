import jwt from 'jsonwebtoken';
const { verify } = jwt;

function AuthMiddleware(req, res, next) {
    let token = req.cookies.jwt;
    if(!token){
        return res.status(400).json({msg: 'Required Token'});
    }

    // verify token
    verify(token, process.env.JWT_PASS, (err, user) => {
        if(err){
            return res.status(401).json({msg: 'Invalid Token'});
        }
        next();
    });

  }

  export default AuthMiddleware;