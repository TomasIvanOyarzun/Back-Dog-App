import {prop, getModelForClass,Ref, modelOptions} from '@typegoose/typegoose'
import { v4} from 'uuid'
import { Dog } from './Dog'




@modelOptions({ options: { disableLowerIndexes: true } })
class Preference {
    @prop({type : () => [String]})
    temperaments : Array<string>
    @prop({type : () => [String]})
    size : Array<string>

}
export class User {
    @prop({type : String, required : true})
    name : string

    @prop({type : String, unique : true , required : true})
    email : string  
    
    @prop({type : String, required : true})
    password : string

    @prop({type : String || null, default : () => v4() })
    token : string | null

    @prop({type: String, default: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'}) 
    image : string

    @prop({type : () => Preference}) 

    preference : Preference

    @prop({type : Boolean, default : false})

    email_confirmed : boolean

    @prop({type: String, default : 'user'})

    role : String
   
    @prop({ ref : () => Dog})
    favorite : Ref<Dog>[]
    
}


export const UserModel = getModelForClass(User)