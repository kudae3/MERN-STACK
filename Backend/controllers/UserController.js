import generateJWT from '../functions/generateJWT.js';
import User from '../models/User.js';

const UserController = {
    
    register: async (req, res) => {
        try{
            let {name, email, password} = req.body;
            const user = await User.register(name, email, password)
            const token = generateJWT(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 1000*60*60*24*365});

            return res.status(200).json({message: 'User created successfully', user, token});
        }   
        catch(error){
            return res.status(400).json({message: error.message || 'Internal Server Error'});
        }     
    },
    
    login : (req, res) => {
        return res.json({message: 'Login Api'});
    }
}

export default UserController;