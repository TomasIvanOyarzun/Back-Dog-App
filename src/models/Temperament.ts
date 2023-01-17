import {prop, getModelForClass} from '@typegoose/typegoose'
import { DogModel} from './Dog'
import {ObjectId} from 'mongoose'

class Temperament {
    
    @prop({unique : true})
      name : string

 
      
 
}

export const TemperamentModel = getModelForClass(Temperament)