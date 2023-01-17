import express from "express";
import cors from "cors"
import {NextFunction, Request, Response, } from "express"
import { mongooseConnect } from "./src/db/db";
import myroutes from './src/routes/index'


const server = express()
const port = process.env.PORT || 3001
server.use(cors())
server.use(express.json())
server.use(myroutes)

server.use((err: Error , req : Request, res : Response, next : NextFunction) => { 
    
    const message = err.message || err;
    console.error(err);
    res.status(500).send(message);
  });


  
   mongooseConnect()
  
    server.listen(port, () => {
      console.log(`server is running on port ${port}`)
  })

 
   
    
 
   
   
 

