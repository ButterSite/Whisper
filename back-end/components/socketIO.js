import { Server } from "socket.io";
import { createServer } from 'http';
import jwt from 'jsonwebtoken';

class SocketIo {
    constructor(app) {
        this.server = createServer(app)
        this.io = new Server(this.server,{
            cors: {
              origin: 'http://localhost:3000', 
              methods: ['GET', 'POST'], 
              credentials: true, 
            },
          });

        this.users = new Map()
    }



    async turnOnSocket() {
        console.log(`Socket.IO started...`)
        this.io.use((socket,next) => {
            try {
                const token = jwt.verify(socket.handshake.auth.token,process.env.JWTSecretToken);
                socket.username = token.username;
                socket.publicKey = token.publicKey;
                next()

            }catch(error) {
                console.log(error)
                next(new Error(`Authorization failed`))
            }
        })

        this.io.on(`connection`, (socket) => {
            this.users.set(socket.username, socket.id);

            socket.on(`privateMessage`, (data) => {
                const targetId = this.users.get(data.recipient);
                if(targetId) {
                    console.log(data)
                    console.log(`Socket ${socket.id}`)
                    socket.to(targetId).emit(`privateMessage`,{
                        user: socket.username,
                        msg: data.message
                    })
                }else {
                    socket.emit(`error`,`User not found/offline`);
                };
            });

            socket.on(`joinGroup`, (room) => {
                socket.join(room);
                console.log(`${socket.username} joined to ${room}`);
                socket.emit(`joined`)
            })


            socket.on(`groupMessage`, ({room, message}) => {
                console.log(message);
                console.log(room);
                this.io.to(room).emit(`groupMessage`,{msg: message})
                
            })

            socket.on(`disconnect`,() => {
                this.users.delete(socket.username);
            });
        });

    

        this.io.on(`connect_error`, (error) => {
            console.log(error);
            throw error;
        });



        this.server.listen(3001)
        
    }

}


 


export default SocketIo
