import { ObjectId } from "mongoose"

export interface IDog {
  name : string
  weight : string
  height : string
  life_span : string
  image : string
  temperament : string[]
  user : string
}

export interface dogApi {
  weight : {
    imperial : string,
    metric : string, 
  },
  height : {
    imperial : string,
    metric : string,
 },
 
 id : number,
 name : string,
 bred_for : string,
 breed_group : string,
 life_span : string,
 temperament : string,
 origin : string,
 reference_image_id : string,
 image: {
    id : string,
    width : number,
    height : number,
    url : string
 }

}

export interface userRegister {
   name : string,
   email : string,
   password : string
}

export type emailPassword = Omit<userRegister, "name">;

export interface updatePassword {
  pass : string, 
  newPassword : string
}

export interface commentPost {
  dog : ObjectId,
  comment : string,
  user : ObjectId
}

export interface userDataPut {
 
  email_confirmed : boolean
  email : string 
  image : string
   role : string
   userName : string
   favorite : string
}