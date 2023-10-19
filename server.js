import { ApolloServer} from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground  } from 'apollo-server-core'
import {resolvers} from './resolvers.js'
import {typeDefs} from './schemaGql.js'
import mongoose from 'mongoose'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express';
import http from 'http';
import cors from 'cors';



const port = process.env.PORT || 4000
if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("Error is", err)
})


import './models/Quote.js'
import './models/User.js'
import path from 'path'


//Middleare
const context = ({req})=>{
   const {authorization} = req.headers
   if(authorization){
    const {userId} = Jwt.verify(authorization, process.env.JWT_SECRECT)
    return {userId}
   }
}

const app = express();

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client", 'build','index.html'))
    })
}
app.use(cors())
app.get('/',(req,res)=>{
    res.send('boomk')
})

const httpServer = http.createServer(app);


//Integrate Server to connect with node js
const server = new ApolloServer({
    typeDefs,
    context,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        process.env.NODE_ENV !== 'production' ? 
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
})


//server listen to default 4000 Port
await server.start();
server.applyMiddleware({ app });

httpServer.listen({port}, ()=>{
     console.log(`🚀  Server ready at: ${server.graphqlPath}`) 
})

