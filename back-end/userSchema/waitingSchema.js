import mongoose from "mongoose";
import validateKey from "../components/validatePublicKey.js";
class WaitingSchema {
    constructor() {
        const messageLength = parseInt(process.env.PGP_MESSAGE_LENGTH, 10) || 32;
        this.waitingSchema = new mongoose.Schema({
            username: {
                type: String,
                required: [true, 'Username is required'],
                minlength: [6, 'Username need to have minimum 3 characters'],
                maxlength: [20, 'Username need to have max 20 characters'],
                unique: [true, `Username need to be unique`]
              },
            messageForUser: {type: String, required: true,
                validate: {
                    validator: async function(value) {
                        return value.length === messageLength;
                    },
                    message: `Message need to have exacly ${messageLength} characters.`
                }
            },
            publicKey: {type: String, required: true,
                validate: {
                validator: async function (key) {
                    const isValid = await validateKey(key)
                    return isValid
                }, message: "Invalid PGP public key."
            }},
            createdAt: {
                type: Date,
                default: Date.now,
                index: {expires: `15m`}
            }
        })
        this.waitingUser = mongoose.model(`WaitingUser`,this.waitingSchema)

    }
    getModel() {
        return this.waitingUser
    }
}

export default WaitingSchema