import { Server} from "socket.io"
import http from "http"
import express from "express"

const app=express()
const server=http.createServer(app)

//connecting the frontend 
const io=new Server(server,{
    cors: {
        origin:["http://localhost:5173"]
    }
})

//socket.on(eventName, callback)
io.on("connection",(socket)=>{
console.log("A uder connected",socket.id)

socket.on("disconnect",()=>{
    console.log("a user id disconnected",socket.id)
})


})

export {io,app,server}