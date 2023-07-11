import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
        
    try {
        const { name, email, password } = req.body;
        const usernameCheck = await userModel.findOne({ name });
        if (usernameCheck)
          return res.json({ msg: "Username already used", status: false });
        const emailCheck = await userModel.findOne({ email });
        if (emailCheck)
          return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new userModel({
          email,
          name,
          password: hashedPassword,
        }).save();
        delete user.password;
        return res.send({ status: true, user });
      } catch (ex) {
        res.send({
            success:false,
            message:'Error in Registreration',
            ex
        })
      }

}


export const loginController = async (req, res) => {
        
    try {
        const { name, password } = req.body;
    
        const user = await userModel.findOne({ name });
        if (!user)
          return res.json({ msg: "user not existe", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.send({ status: false,  msg: "password incorrect or userName"});
        }

        delete user.password;
        return res.send({ status: true, user });
      } catch (ex) {
        res.send({
            success:false,
            message:'Error in login',
            ex
        })
      }

}


export const avatarController =  async (req,res) =>{
        try {
          const userId = req.params.id;
          console.log(userId);
          const avatarImage = req.body.image;
          const userData = await userModel.findByIdAndUpdate(
            userId,
            {
              isAvatarImageSet: true,
              avatarImage,
            },
            { new: true }
          );
          return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });
        } catch (ex) {
            res.send({
                success:false,
                message:'Error in setting avatar',
                ex
            })
        }

}


export const categoriesController =  async (req,res) =>{
    try {
      const userId = req.params.id;
      console.log(userId);
      const categories = req.body.categories;
      const userData = await userModel.findByIdAndUpdate(
        userId,
        {
            categories
        },
        { new: true }
      );
      return res.json({
        isSet: true,
        categories: userData.categories,
      });
    } catch (ex) {
        res.send({
            success:false,
            message:'Error in setting categories',
            ex
        })
    }

}


export const roomController = async (req, res) => {
  try {
    const { categories } = req.body;
    const usersData = await userModel.find({
      categories: { $elemMatch: { $regex: categories, $options: 'i' } },
    });

    return res.send({
      status: true,
      usersData,
    });
  } catch (ex) {
    res.send({
      status: false,
      message: 'Error in getting users',
      ex,
    });
  }
};
