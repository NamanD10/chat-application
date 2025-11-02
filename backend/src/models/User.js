import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        unique: true,
        required: true,
    },
    password:  {
        type: String,
        minlength: 8,
        required: true,
    },
    bio : {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    bookInterests: [],
    cinemaInterests: [],
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
},
{timestamps: true});

//this is the pre hook so the body runs before doing the action passed as argument i.e. save
userSchema.pre("save", async function (next) {

    //only run when password is modified 
    if(!this.isModified("password"))
        return next();

    //hash the password before saving into db 
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {

    const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password);  //comparing the enteredPassword with user model ka password
    return isPasswordMatch;

};

const User = mongoose.model("User", userSchema);
export default User;