import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import { generateAndSetTokens } from "../lib/generateAndSetTokens.js";

export const signup = async (req, res) => {

    console.log(req.body);
    
    try {
        const { userName, password, email } = req.body;

        if (!userName || !password || !email) {
            return res.status(400).
                json({ message: "Provide all necessary fields" });
        }

        if (password.length < 6) {
            return res.status(400).
                json({ message: "Password length must be greater than 6" });
        }

        const user = await User.findOne(
            {
                $or:
                    [
                        { userName: userName },
                        { email: email }
                    ]
            }
        );
        
        if(user) {
            //console.log(user);
            return res.status(200).
            json({message: "User with that username or email already exists"});
        }
        
        
        
        //hashing the password
        const salt =  await bcrypt.genSalt(10);
        //console.log("salt", salt);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        //console.log("psdd", hashedPassword);

        const newUser = await User.create(
            {
                userName: userName,
                password: hashedPassword,
                email: email
            }
        );

        if(newUser){
            generateAndSetTokens(newUser._id, res)
            return res.status(200).
            json({
                   user: {
                        username: newUser.userName,
                        email: newUser.email,
                        healthDetails: newUser.healtDetails
                    },
                    
                    message: "User Created Successfully"
                })
        }else{
            return res.status(400).
            json({message: "Invalid User data"});
        }

   } catch (error) {
        console.log("Error in signup", error);
        return res.status(404).
        json({message: "Internal Server Error"});
    }
}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({email: email});
        
        
        if(!user){
            return res.status(401).
            json({message: "User does not exists"});
        }
    
        const comparePassword = await bcrypt.compare(password, user.password);
        
        if(comparePassword){
            generateAndSetTokens(user.id, res)
            return res.status(200).
            json({
                    user: {
                        userName: user.userName,
                        email: user.email,
                        healthDetails: user.healtDetails
                    }, 
                    
                    message: "User Logged In Succesfully"
                    
                });
        }else{
            return res.status(401).
            json({message: "Invalid Credentials"});
        }

    } catch (error) {
        
        console.log("Error in login", error);
        return res.status(500).
        json({message: "Internal Server Error"})
        
    }

}

export const logout = async (req, res) => {

   try {
     res.cookie(
        "jwt",
         "",
         {
             maxAge: 0
         }
     )
 
     return res.status(200).
     json({message: "User logged out succesfully"});

   } catch (error) {

        console.log("Error in login", error);
        return res.status(500).
        json("Internal Server Error")

   } 
} 



