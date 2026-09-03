import jsonwebtoken from 'jsonwebtoken'
import { UserModel } from '../../models/index.mjs'

export const authGuardJWT = async(req,res, next) => {
//    console.log("middleware is running...");


try {
    const token = req.headers.token
// console.log("token" , token);

if (!token) {
    return res.status(401).send({
        message: "unauthorized"
    })
    
}

const decodedToken = jsonwebtoken.verify(token, process.env.JWT_KEY)
console.log(decodedToken);

const currentUser = await UserModel.findOne({_id: decodedToken._id})
console.log(currentUser);

req.currentUser = currentUser

next()
    
} catch (error) {
    console.log(error);
    return res.status(401).send({
        message: "unauthorized"
    })
    
    
}
   
    

}