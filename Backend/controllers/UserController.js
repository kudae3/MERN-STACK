import generateJWT from '../functions/generateJWT.js';
import User from '../models/User.js';

const UserController = {
    
    register: async (req, res) => {
        try{
            let {name, email, password} = req.body;
            let userExists = await User.findOne({email});
            if(userExists){
                return res.status(400).json({message: 'User already exists'});
            }
            const user = await User.register(name, email, password)
            const token = generateJWT(user._id);
            res.cookie('jwt', token, {httpOnly: true});

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