import jwt from 'jsonwebtoken';
import 'dotenv/config'

const generateJWT = (id) => {
    let token = jwt.sign(
        {id},
        process.env.JWT_PASS,
        {
            expiresIn: "1y",
        }
    );
    return token;
};

export default generateJWT;