import express from 'express';
import cors from 'cors';
import router from './routes/userRoutes.js';
import mongoDB from './components/dataBase.js';
import SocketIo from './components/socketIO.js';




class serverComunication {
    constructor() {
        this.mongoDB = new mongoDB();
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(`/app`,router)
        this.port = process.env.PORT;
        this.SocketIo = new SocketIo(this.app)
        this.SocketIo.turnOnSocket()
        

    }
    
    createEndPoint() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`)
        })

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
          });
    }



}


const server = new serverComunication()

server.createEndPoint()

export default serverComunication