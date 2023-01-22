import { User, UserModel } from "../../models/User";
import { Request, Response, NextFunction } from "express";
import { userRegister, emailPassword, updatePassword, commentPost, userDataPut } from "../../types";
import bcrypt from 'bcrypt'
import { generateJWT } from "../../helper/generateJWT";
import { emailRegister } from "../../helper/nodeMailer/messages";
import { DogModel } from "../../models/Dog";

export const registerUser = async (req : Request , res : Response, next : NextFunction) => {
    const  {name , email , password} : userRegister = req.body
  
    const user = await UserModel.findOne({email})
   
       if(user) {
        return  res.status(400).json({ error: true, msg: "User already registered" });
          
       }
    try {
        const encriptPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({name, email, password : encriptPassword})
        await newUser.save()
             const data = {
              name : newUser.name,
              email : newUser.email,
              token : newUser.token
             }
          emailRegister(data)
        return res.status(200).json({error: true, msg : 'You have successfully registered'})
    } catch (error) {
        next(error)
    }
}


export const confirmUser = async (req : Request , res : Response, next : NextFunction) => {
       
    const { token} = req.params

    try {
         const user = await UserModel.findOne({token})

         if(!user) return res.status(400).json({error: true, msg: "invalid token" })

        else {

            user.token = null
            user.email_confirmed = true
            await user.save()
            return res.json({ error: false,  msg: "successfully registered user" });
        }
         
      

    } catch (error) {
        next(error)
    }

}

export const authenticateUser = async (req : Request , res : Response, next : NextFunction) => {
    const { email, password }: emailPassword = req.body;
  
    try {
       const userAuthenticate = await UserModel.findOne({email})
      
      if (userAuthenticate === null) {
       return res.status(401).send({ msg: "User doesn't exist!" });
       
      }
  
      if (userAuthenticate.email_confirmed === false) {
        return res.status(401).send({ msg: "User not confirmed!" });
        
      } else {
        const passwordValidate = await bcrypt.compare(password, userAuthenticate.password);
  
        if (!passwordValidate)
          res.status(401).json({ msg: "Invalid password!" });
        else {
          res.status(200).json({
            token: generateJWT(userAuthenticate._id),
            error: false,
            msg: "User enabled to login",
          });
        }
      }
    } catch (error) {
      next(error)
    }
  };


  export const changePassword = async (req: Request, res: Response , next : NextFunction) => {
    const { id } = req.params;
    const { pass, newPassword}: updatePassword = req.body;
 
    const user = await UserModel.findById(id );
   
    if (!user) {
     return  res.status(403).json({ error: true, msg: "Username does not exist" });
      
    }
    try {
      
      const passwordValidate = await bcrypt.compare(pass, user.password);
         
      if (passwordValidate) {
        const encriptPassword = await bcrypt.hash(newPassword, 10);
        user.password = encriptPassword;
        user.save();
        return res.status(200).json({error: false,  msg: "updated password" });
        
      } else {
        return res.status(500).json({ error: true, msg: "Incorrect password" });
        
      }
    } catch (error) {
      next(error)
    }
  };
  

  export const userData = async (req: Request, res: Response , next : NextFunction ) => {
    try {
      const userData = await UserModel.findById(req.app.locals.id);
  
      if (userData == null) {
        res.status(400).json({ msg: "dato del usuario no existen" });
        return;
      }
  
      const user = {
        _id: userData._id,
        name: userData.name,
        image : userData.image,
        email: userData.email,
        role : userData.role,
        email_confirmed : userData.email_confirmed,
        favorite : userData.favorite.map(el => el)

      };
      res.status(200).json(user);
    } catch (error) { next(error)}
  }


  
  export const getAllUser = async (req: Request, res: Response , next : NextFunction) => {

    
   try {
       const allUser = await UserModel.find({email_confirmed : true})
      

       res.status(200).json(allUser)
   } catch (error) {

     next(error)
     
   }
 }

 export const getUpdateUser = async (req: Request, res: Response , next : NextFunction) => {

     const { userName, favorite ,email, email_confirmed, image ,role }   = req.body as userDataPut
      const { id} = req.params
  try {

       const userFix = {
          name : userName ,
          favorite ,
          email,
          email_confirmed,
          image,
          role

       }
    
      const user = await UserModel.findByIdAndUpdate(id , 
        { $set: userFix },
        { new: true })
       

      res.status(200).json(user)
  } catch (error) {

    next(error)
    
  }
}

export const getFavoriteUser = async (req: Request, res: Response , next : NextFunction) => {

  
   
  try {
  
   
   
      if(req.params.id !== "undefined") {
        const user = await UserModel.findById(req.params.id)
       return  res.status(200).json(user?.favorite)
      }
    
                          
     return res.status(400).json({error : true , msg : "an id was not sent"})
    
  } catch (error) {
  
   next(error)
   
  }
  }

export const getFavoriteUserDogFull = async (req: Request, res: Response , next : NextFunction) => {

  
   
try {

 
 
   const user = await UserModel.findById(req.params.id)
                        .sort({_id: -1})                 
                                            
                       
                        .populate('favorite')
                        .exec(); 

   res.status(200).json(user?.favorite)
} catch (error) {

 next(error)
 
}
}


