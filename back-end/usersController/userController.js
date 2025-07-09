import encryptMessage from "../components/pgpEncryption.js";
import generatePassword from "../components/passwordGenerator.js";
import mongoDB from "../components/dataBase.js";
import { generateToken } from "../components/jsonwebtoken.js";




class userController {
    constructor() {

    }

    static async initAuth(req,res) {
        try {
            let {username, publicKey} = req.body;
            const isSignUp = publicKey;
            if(!username) {
                return res.status(500).json({
                    success: false,
                    message: `No username provided`
                });
            };

            if(isSignUp) {
                const userExist = await mongoDB.findUser(username,`User`)
                if(userExist) {
                    return res.status(409).json({
                        success: false,
                        message: `Username is already taken`
                    })
                }
            }

            const newUser = await mongoDB.createNewWaitingUser(username,publicKey);
            if(newUser.error) {
                return res.status(404).json({
                    success: false,
                    message: newUser.error
                })
            }
            if(!newUser) {
                return res.status(404).json({
                    success: false,
                    message: `Problem with login`
                })
            }
            if(!publicKey) {
                publicKey = newUser.publicKey;
            };
            const encryptedMessage = await encryptMessage(publicKey,newUser.message);
            return res.status(201).json({
                success: true,
                message: encryptedMessage,
            });

        }catch(error) {
            console.log('initAuth error:', error);
            if (error.name === 'ValidationError') {
              return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message,
              });
            }
            return res.status(500).json({
              success: false,
              message: 'Server error',
              error: error.message,
            });
        }
    }

    static async verifyAuth(req,res) {
        try {
            const {username, messageFromUser} = req.body
            if(!username || !messageFromUser) {
                return res.status(500).json({
                    success: false,
                    message: `Username or message not provided`
                });
            };
            const {awaitingMessage, usernameFromDB, publicKey} = await mongoDB.findUser(username,`WaitingUser`);
            const userExist = await mongoDB.findUser(username,`User`);
            if(awaitingMessage !== messageFromUser.trim()) {
                return res.status(401).json({
                    success: false,
                    message: `Wrong decrypted message`
                })
                }
            const messageLength = parseInt(process.env.PGP_MESSAGE_LENGTH, 10) || 32;
            if(messageFromUser.trim().length !== messageLength) {
                return res.status(401).json({
                    success: false,
                    message: `Wrong message length`
                })
            }
            let userId;
            if(userExist) {
                userId = userExist._id;
            }else {
                const newUser = await mongoDB.createNewUser(usernameFromDB,publicKey);                        
                userId = newUser._id;
            };

            const token = await generateToken(usernameFromDB,publicKey,userId)
            await mongoDB.deleteWaitingUser(usernameFromDB);
            return res.status(200).json({
                success: true,
                token: token
            })


            
        }catch(error) {
            console.log('verifyAuth error:', error);
            if (error.name === 'ValidationError') {
              return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message,
              });
            }
            return res.status(500).json({
              success: false,
              message: 'Server error',
              error: error.message,
            });
        }
    }

    static async getFriendsList(req,res) {
        try {
            const {id} = req.user;
            const {isEncrypted, friendsList} = await mongoDB.getFriends(id);
            res.status(200).json({friendsList: friendsList, isEncrypted: isEncrypted});
        }catch(error) {
            console.log(`getfriendsListEncrypted error`, error)
            return res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
              });
        }
    }







    static async addFriendEncrypted(req,res) {
        try {
            const {id} = req.user
            const {encryptedFriends} = req.body;
            const newFriends = await mongoDB.addFriendEncrypted(id, encryptedFriends);
            if(!newFriends) res.status(500).json({error: `Problem with editing friends list`});
            res.status(200).json({success: true});
            

        }catch(error) {
            console.log(`addFriendEncrypted error`, error)
            return res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
              });

        }
    }

    static async addFriend(req,res) {
        try {
            const {id} = req.user;
            const {friend} = req.body;
            const {success, message, friendsList} = await mongoDB.addFriend(id,friend)
            console.log(friendsList)
            if(!success) {
                return res.status(400).json({success: success, message: message})
            }

            res.status(200).json({success: success, friendsList: friendsList, message: message});


        }catch(error) {
            console.log(`addFriend error`, error)
            return res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
              });
        }
    }

    static async searchUser(req,res) {
        try {
            const username = req.params.username;
            const user = await mongoDB.findUser(username,`User`);
            if(username && user) {
                res.status(200).json({
                    success: true,
                    recipient: user.username,
                    publicKey: user.publicKey
                });
            }else {
                res.status(400).json({
                    success: false,
                    message: `User not found`
                });
            }
        }catch(error) {
            res.status(500).json({
                success: false,
                message: `Server error`
            });
            throw error
        }


    }



   
}

export default userController;