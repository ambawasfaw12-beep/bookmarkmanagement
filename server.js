import http from 'node:http'
import { apiHandlerFun } from './route.js'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res)=>{
    apiHandlerFun(req, res)
}) 

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})