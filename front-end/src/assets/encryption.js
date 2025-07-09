


export const encryptObject = async (object,password) => {
    try {
        const openpgp = await import('openpgp');
        const stringObject = JSON.stringify(object);
        const encryptedString = await openpgp.encrypt({
            message: await openpgp.createMessage({text: stringObject}),
            passwords: [password],
        })

        return encryptedString;
    }catch(error) {
        throw error;
    }

}


export const decryptObject = async (encryptedObject,password) => {
    try {
        const openpgp = await import('openpgp');
        let decryptedObject = await openpgp.decrypt({
            message: await openpgp.readMessage({armoredMessage: encryptedObject}),
            passwords: [password]
        })
        decryptedObject = await JSON.parse(decryptedObject.data);

        return decryptedObject
    }catch(error) {
        console.log(error)
        return false
    }
}


export const encryptMessage = async (publicKeyArmored,plainText) => {
    try {
        const openpgp = await import('openpgp');
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