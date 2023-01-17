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
           res.status(400).json({ error: true, msg: "usuario ya registrado" });
           return
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

         if(!user) res.status(400).json({error: true, msg: "token no valido" })

        else {
            user.token = null
            user.email_confirmed = true
            await user.save()
        }
         
        res.json({ msg: "usuario registrado correctamente" });

    } catch (error) {
        next(error)
    }

}

export const authenticateUser = async (req : Request , res : Response, next : NextFunction) => {
    const { email, password }: emailPassword = req.body;
  
    try {
       const userAuthenticate = await UserModel.findOne({email})
      
      if (userAuthenticate === null) {
        res.status(401).send({ msg: "¡Usuario no existe!" });
        return;
      }
  
      if (userAuthenticate.email_confirmed === false) {
        res.status(401).send({ msg: "¡Usuario no confirmado!" });
        return;
      } else {
        const passwordValidate = await bcrypt.compare(password, userAuthenticate.password);
  
        if (!passwordValidate)
          res.status(401).json({ msg: "¡Password inválido!" });
        else {
          res.status(200).json({
            token: generateJWT(userAuthenticate._id),
            error: false,
            msg: "Usuario habilitado para loguearse",
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
    const user = await UserModel.findOne({ id });
    if (!user) {
      res.status(403).json({ error: true, msg: "El usuario no existe" });
      return;
    }
    try {
      const passwordValidate = await bcrypt.compare(pass, user.password);
  
      if (passwordValidate) {
        const encriptPassword = await bcrypt.hash(newPassword, 10);
        user.password = encriptPassword;
        user.save();
        res.status(200).json({ msg: "Contraseña actualizada" });
        return;
      } else {
        res.status(500).json({ error: true, msg: "Contraseña incorrecta" });
        return;
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
        userName: userData.name,
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

     const { userName, favorite }   = req.body as userDataPut
      const { id} = req.params
  try {

     
    
      const user = await UserModel.findByIdAndUpdate(id , 
        { $set: {...req.body, name : userName,  favorite } },
        { new: true })
       

      res.status(200).json(user)
  } catch (error) {

    next(error)
    
  }
}

export const getFavoriteUser = async (req: Request, res: Response , next : NextFunction) => {

  
   
  try {
  
   
   
     const user = await UserModel.findById(req.params.id)
    
                          
     res.status(200).json(user?.favorite)
    
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


