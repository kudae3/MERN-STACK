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
    
    login : async (req, res) => {
        try {
            let {email, password} = req.body;
            const user = await User.login(email, password);
            
            const token = generateJWT(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

            return res.status(200).json({message: 'User Login successfully', user, token});
        } 
        catch (error) {
            if (error.message === 'Incorrect Password') {
                return res.status(400).json({
                  errors: { password: { msg: error.message } }
                });
              }
            else{
                return res.status(400).json({message: error.message});
            }
        }
    },

    logout: async (req, res) => {
        try {
            res.cookie('jwt', '', {maxAge: 1});
            return res.status(200).json({message: 'User logged out successfully'});
        } catch (error) {
            return res.status(400).json({message: error.message || 'Internal Server Error'});
        }
    }   
}

export default UserController;