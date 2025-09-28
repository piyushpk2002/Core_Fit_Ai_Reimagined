import jwt from "jsonwebtoken"

export const generateAndSetTokens = async (id, res) => {

    if(!id){
        return res.status(400).json({
            message: "id not found"
        });
    }

    //console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {
            expiresIn: "7d"
        }
    );
    //console.log("token", token);

    res.cookie(
        "jwt", 
        token, 
        {
            expiresIn: "7*24*60*60*1000",
            sameSite: "strict",
            httpOnly: true,
            secure: process.env.mode !== "development"
        }
    )
   
}