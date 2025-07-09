
function generatePassword(lenght) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"
    let password = ``
    for(let i = 0; i < lenght; i++) {
        const char = charset[Math.floor(Math.random() * charset.length)]
        password += char;
    }
    console.log(password);
    return password

}

export default generatePassword