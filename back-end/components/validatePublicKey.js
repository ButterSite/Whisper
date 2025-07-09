
import * as openpgp from 'openpgp'
async function validateKey(publicKeyArmored) {
    try {
        const publicKey = await openpgp.readKey({armoredKey: publicKeyArmored});
        return true;
    }catch(error) {
        console.log(error)
        return false
    }

    
}

export default validateKey
