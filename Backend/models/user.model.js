import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"first name must be of 3 and more character"],

        },
        lastName:{
            type:String,
            minlength:[3,'last name must be of character 3 and more']
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:[12,"email must be at least 12 characters long"],

    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

const User = mongoose.model("User",userSchema);

export default User;
