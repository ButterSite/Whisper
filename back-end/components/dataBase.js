import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import UserSchema from '../userSchema/userSchema.js';
import WaitingSchema from '../userSchema/waitingSchema.js'
import generatePassword from './passwordGenerator.js';
import { console } from 'inspector';
class mongoDB {
    constructor() {
        dotenv.config();
        this.connectDataBase();
        this.UserSchema = new UserSchema();
        this.User = this.UserSchema.getUserModel();
        this.waitingSchema = new WaitingSchema();
        this.WaitingUser = this.waitingSchema.getModel();

    }

    async connectDataBase() {
        try {
            console.log(`Connecting to database...`)
            await mongoose.connect(process.env.mongo_URI);
            console.log(`Connected to database`)
        }catch(error) {
            throw error
        }



    }


    static async addFriend(userId,friend) {
        try {
            const searchForUser = mongoose.model(`User`);
            const user = await searchForUser.findOne({ _id: userId });
            if(!user) return false;
            if(user.friendsList.isEncrypted) {
                return {success: false, message: `Friends list is encrypted`};
            }
            
            const friendExist = user.friendsList.data.some(f => f.username === friend.username);

            if(friendExist) return {success: false, message: `Friend is already in friends list`};


          
            const updateResult = await searchForUser.updateOne(
                { _id: userId },
                {
                $push: {
                    'friendsList.data': {
                    username: friend.username,
                    publicKey: friend.publicKey,
                    },
                },
                }
            );

            if(!updateResult) {
                return {
                    success: false,
                    message: `Problem with adding a friend`
                }
            }


            await user.save();
            return {
                success: true,
                message: 'Friend added successfully',
                friendsList: user.friendsList.data,
              };
        }catch(error) {
            throw error
        }
    }


    static async addFriendEncrypted(userId,encryptedFriends) {
        try {
            const searchForUser = mongoose.model(`User`);
            const user = await searchForUser.findOne({ _id: userId });
            if(!user) return false;
            user.friendsList = {
                isEncrypted: true,
                data: encryptedFriends
            };
            await user.save();
            return user.friendsList;
        }catch(error) {
            throw error
        }
    }


    static async getFriends(userId) {
        try {
            const searchForUser = mongoose.model(`User`);
            const user = await searchForUser.findOne({ _id: userId });
            if(!user) return false;
            const {isEncrypted, data} = user.friendsList
            return {isEncrypted: isEncrypted, friendsList: data};
        }catch(error) {
            throw error
        }

    }


    static async deleteWaitingUser(username) {
        try {
            await mongoose.model('WaitingUser').deleteOne({ username: username });
        }catch(error) {
            throw error
        }


    }






    static async findUser(username,model) {
    try {
        const searchForUser = mongoose.model(model);
        const user = await searchForUser.findOne({ username: username });
        if(!user) {
            return false;
        }
        if(model === `WaitingUser`) {
            return {
                awaitingMessage: user.messageForUser,
                usernameFromDB: user.username,
                publicKey: user.publicKey, 
                _id: user._id,
            };
        }else {
            return user
        }

    } catch (error) {
        console.log('findUser error:', error);
        throw error

    }
}


    static async createNewUser(username,publicKey) {
        try {
            const User = mongoose.model(`User`);
            const newUser = new User({
                username: username,
                publicKey: publicKey
            })
            const userNew = await newUser.save()
            return userNew;
        }catch(error) {
            throw error
        };

    };

    static async createNewWaitingUser(username,publicKey) {
        try {
            const messageLength = parseInt(process.env.PGP_MESSAGE_LENGTH, 10) || 32;
            const message = generatePassword(messageLength);
            const WaitingUser = mongoose.model(`WaitingUser`)
            let finalPublicKey = publicKey;
            if(!publicKey) {
                console.log(`Searching user`);
                const user = await this.findUser(username,`User`)
                if(!user) {
                    return {error: `User not found`}
                };
                finalPublicKey = user.publicKey
            }
            const newWaitingUser = new WaitingUser({
                username: username,
                messageForUser: message,
                publicKey: finalPublicKey
            });
            await newWaitingUser.save()
            return {message: message, publicKey: finalPublicKey};
        }catch(error) {
            throw error
        };
    };
};

export default mongoDB;
