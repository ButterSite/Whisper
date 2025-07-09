class fetchApi {
    constructor() {
        this.url = "http://localhost:2137/app/"
    }


    async getUser(username) {
        try {
            const response = await fetch(`${this.url}searchUser/${username}`);
            return response.json()
        }catch(error) {
            throw error
        }
    }




    async getFriends() {
        try {
            const token = localStorage.getItem(`jwtToken`);
            if(!token) return false;
            const response = await fetch(`${this.url}get-friends`,{
                method: `GET`,
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }})
                if(!response) return false;
                const {friendsList, isEncrypted} = await response.json();
                if(!friendsList) return false;
                console.log(friendsList)
                return {friendsList, isEncrypted};
        }
        catch(error) {
            throw error
        }
    }

    async addFriendEncrypted(encryptedFriends) {
        console.log(`ADD`)
        const token = localStorage.getItem(`jwtToken`);
        if(!token) return false;
        const response = await fetch(`${this.url}add-friend-encrypted`,{
            method: `POST`,
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({encryptedFriends: encryptedFriends})
        })
        if(!response.ok) return false;
        const {success} = await response.json();
        return success
    }


    async addFriend(friend) {
        try {
        const token = localStorage.getItem(`jwtToken`);
        if(!token) return false;
        const response = await fetch(`${this.url}add-friend`,{
            method: `POST`,
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({friend: friend})
        })
        if(!response.ok) return false;
        const data = await response.json();
        console.log(data)
        return data
        }catch(error) {
            throw error
        }

    }

    async initAuth(username,publicKey) {
        try {
            const response = await fetch(`${this.url}init-auth`,
                {method: `POST`,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username,publicKey: publicKey || null})});
                return response.json();
        }catch(error) {
            throw error
            
        }

    }


    async verifyAuth(username,message) {
        try {
            const response = await fetch(`${this.url}verify-auth`,
                {method: `POST`,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username,messageFromUser: message})});
                console.log(message);
                return response.json();
        }catch(error) {
            throw error
        }

    }

    async getFirstSetUp() {
        try {
            const token = localStorage.getItem(`jwtToken`);
            if(!token) return false
            const response = await fetch(`${this.url}get-first-set-up`, {
                headers: {
                    method: `GET`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            })
            if(!response.ok) return false;
            const {firstSetUp} = await response.json();
            return firstSetUp;
        }catch(error) {
            throw error;
        }
    }

}

export default fetchApi