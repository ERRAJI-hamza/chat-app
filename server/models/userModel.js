import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max:50,
        },
        password: {
            type: String,
            required: true,
            min:6,
        },
        isAvatarImageSet:{
            type: Boolean,
            default:false,
        },
        avatarImage:{
            type: String,
            default: "",
        },
        categories: {
            type: Array,
            default: [],
          },
    },
    { timestamps: true }
);

export default mongoose.model("users",userSchema);