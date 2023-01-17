
import {  dogApi} from "../types";
import axios from "axios";

//This function is only used once, to be able to fill the database, with the dog api
export const getDog = async () => {
    const dogs = await axios.get<dogApi[]>('https://api.thedogapi.com/v1/breeds') 
      
        const apiFixName  =  dogs.data.map(element => {
            return {
                name : element.name,
                weight : element.weight.metric,
                height : element.height.metric,
                life_span : element.life_span,
                image : element.image.url,
                temperament : element.temperament?.split(', ').map(sub => sub) 
            }
        }) 
        return [...apiFixName]
}