import User from '../models/User.js';
const UserController = {
    login : (req, res) => {
        return res.json({message: 'Login Api'});
    },
    register: (req, res) => {
        return res.json({message: 'Register Api'});
    }
}

export default UserController;