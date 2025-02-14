import User from '../models/User.js';
import bcrypt from 'bcrypt';
const UserController = {
    
    register: async (req, res) => {
        try{
            let {name, email, password} = req.body;
            let userExists = await User.findOne({email});
            
            if(userExists){
                return res.status(400).json({message: 'User already exists'});
            }
            else{
                let salt = await bcrypt.genSalt();
                let hash = await bcrypt.hash(password, salt);
                let user = await User.create({
                    name, 
                    email, 
                    password: hash
                });
                return res.status(200).json({message: 'User created successfully', user});
            }
        }   
        catch(error){
            return res.status(500).json({message: 'Internal Server Error'});

        }     
    },
    
    login : (req, res) => {
        return res.json({message: 'Login Api'});
    }
}

export default UserController;