import {prop, getModelForClass,Ref} from '@typegoose/typegoose'
import { Comment } from './Comment'


import { User } from './User'

export class Like {
    
    @prop({ref : () => Comment })
    comment : Ref<Comment>
   

    @prop({ref : () => User})   
    likeUser : Ref<User>
}


export const LikeModel = getModelForClass(Like)