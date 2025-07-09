import * as openpgp from 'openpgp';



async function encryptMessage(publicKeyArmored,plainText) {
    try {
        const publicKey = await openpgp.readKey({armoredKey: publicKeyArmored})
        const message = await openpgp.createMessage({text: plainText})
        const encrypted = await openpgp.encrypt({
            message:  message,
            encryptionKeys: publicKey
        })

        return encrypted;
    }catch(error) {
        throw error;
    };
};

export default encryptMessage;