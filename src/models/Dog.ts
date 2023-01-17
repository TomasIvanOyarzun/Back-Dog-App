
import {prop, getModelForClass, plugin, Ref } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2';
import { FilterQuery, PaginateOptions, PaginateResult , PaginateModel} from 'mongoose';
import { User } from './User';




@plugin(mongoosePaginate)
export class Dog {
    
    @prop({required : true})
      name : string

    @prop({type : String, required : true})
      height : string
    
    @prop({type : String, required : true})  
      weight : string

    @prop({type : String, required : true})  
      life_span : string
    
     @prop({type : String,required : true}) 
      image : string
      
    @prop({type : () => [String],required : true})
      temperament : Array<string>

      @prop({type : String}) 
      creator : string
      
    
      static paginate: <T>(
        this: T,
        query?: FilterQuery<T>,
        options?: PaginateOptions,
        callback?: (err: Error, result: PaginateResult<T>) => void,
      ) => Promise<PaginateResult<T>>;
      
}



export const DogModel = getModelForClass(Dog)
