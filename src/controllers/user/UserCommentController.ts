import { UserModel } from "../../models/User";
import { Request, Response, NextFunction } from "express";
import { commentPost } from "../../types";

import { CommentModel } from "../../models/Comment";
import { LikeModel } from "../../models/Like";

export const getAllComment = async (req: Request, res: Response , next : NextFunction) => {
    try {

      const users = await UserModel.find({ comments: {$exists: true, $not: {$size: 0}} })

       res.status(200).json(users)
      
    } catch (error) {
      next(error)
    }
  }

  export const getCommentByDog = async (req: Request, res: Response , next : NextFunction) => {
    const {id} = req.params
   
    try {
           const dog = await CommentModel.find({dog : id, exits : true}).sort({_id : -1})
            .populate('user')

          
              res.status(200).json(dog)
           

         
    } catch (error) {
      next(error)
    }
  }
  export const postComment = async (req: Request, res: Response , next : NextFunction) => {

     const {dog, comment, user} : commentPost = req.body
      console.log(req.body)
    try {
        const newComment = new CommentModel({dog, comment, user})
        await newComment.save()

        res.status(200).json(newComment)
    } catch (error) {

      next(error)
      
    }
  }

  export const updateComment = async (req: Request, res: Response , next : NextFunction) => {
    const {id} = req.params
    
    try {
        const update = await CommentModel.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true })
        

            
            return res.status(200).json(update)
    } catch (error) {
        next(error)
    }
  }


  export const getCommentId = async (req: Request, res: Response , next : NextFunction) => {

    const {id} = req.params
   
  try {
  
   
   
     const user = await CommentModel.find({user : id , exits : true}).populate('dog').populate('user')
      
  
     res.status(200).json(user)
  } catch (error) {
  
   next(error)
   
  }
  }

  export const LikePost = async (req: Request, res: Response , next : NextFunction) => {

  
    
    try {
       const newLike = new LikeModel(req.body)
       await newLike.save()
         res.status(200).json(newLike)
    } catch (error) {
      next(error)
    }
  }

  export const getLikeForId = async (req: Request, res: Response , next : NextFunction) => {

     
    
    try {
       const like = await LikeModel.find()
           
         res.status(200).json(like)
    } catch (error) {
      next(error)
    }
  }

  
  export const removeLikeModel = async (req: Request, res: Response , next : NextFunction) => {

      const {id} = req.params
    
    try {
       const like = await LikeModel.findById(id).remove()
           
         res.status(200).json(like)
    } catch (error) {
      next(error)
    }
  }