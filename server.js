import http from 'node:http'
import { apiHandlerFun } from './route.js'
const port = 3000

const server = http.createServer((req, res)=>{
    apiHandlerFun(req, res)
}) 

server.listen(port,()=>console.log(`Server is running on port ${port}`))