import mongoose from "mongoose";
import validateKey from "../components/validatePublicKey.js";
class UserSchema {
    constructor() {
        this.UserSchema = new mongoose.Schema({
            username: {
                type: String,
                required: [true, 'Username is required'],
                minlength: [6, 'Username need to have minimum 3 characters'],
                maxlength: [20, 'Username need to have max 20 characters'],
                unique: [true, `Username need to be unique`]
              },
            publicKey: {type: String, required: true,
                validate: {
                    validator: async function (key) {
                        const isValid = await validateKey(key)
                        return isValid
                    }, message: "Invalid PGP public key"
                }
            },
            friendsList: {
                type: {
                  isEncrypted: { type: Boolean, default: false },
                  data: { type: mongoose.Schema.Types.Mixed, default: [] }
                },
                default: { isEncrypted: false, data: [] },
              },
        })

        this.createModels();

    }

    createModels() {
        this.User = mongoose.model('User',this.UserSchema);
    }

    getUserModel() {
        return this.User;
    }
}

export default UserSchema