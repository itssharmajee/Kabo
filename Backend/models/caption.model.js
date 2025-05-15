import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const captionSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"firstName should be minimum 3 characters long"]
        },
        lastName:{
            type:String,
            minlength:[3,"lastName should be minimum 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[12,"email should be minimum 12 characters long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color must be minimum 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"vehicle number must be minimum 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity must be atleast 1"],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:String
        }
    }
});

captionSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captionSchema.methods.comparePassword = async function(password){
    
    return await bcrypt.compare(password,this.password);
}
captionSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const Caption = mongoose.model('Caption',captionSchema);

export default Caption;