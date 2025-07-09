import jwt from 'jsonwebtoken';


export const generateToken = async (username,publicKey,id) =>{
    const secretToken = process.env.JWTSecretToken
    const token = jwt.sign(
        {
            id: id,
            username: username,
            publicKey: publicKey
        },secretToken,{expiresIn: "6h"}
    )

    return token

}



export const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(` `)[1];

    const secretToken = process.env.JWTSecretToken
    if(!token) return res.status(401).json({error: `Token not provided`});
    jwt.verify(token,secretToken, (err, decoded) => {
        if(err) return res.status(401).json({error: `Problem with token verification`});
        req.user = decoded;
        next()
    })
};