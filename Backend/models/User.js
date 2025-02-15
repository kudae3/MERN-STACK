import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.register = async function(name, email, password){
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    let user = await this.create({
        name, 
        email, 
        password: hash
    });
    return user;
}

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    const isCorrect = await bcrypt.compare(password, user.password)
    if(isCorrect){
        return user;
    }
    else{
        throw new Error('Incorrect Password');
    }
}

const User = mongoose.model('User', userSchema);
export default User;