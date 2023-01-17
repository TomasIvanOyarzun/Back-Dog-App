import {prop, getModelForClass,Ref} from '@typegoose/typegoose'

import { Dog } from './Dog'
import { User } from './User'

export class Comment {
    
    @prop({ref : () => Dog })
    dog : Ref<Dog>

    @prop({type : String})
    comment : string

    @prop({ref : () => User})
    user : Ref<User>

    @prop({type : Number, default: 0})
    like : number

    @prop({type : Boolean, default: true})   
    exits : boolean

  
}


export const CommentModel = getModelForClass(Comment)