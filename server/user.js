class User{    
    constructor(id, name, email, hashpasswd, phoneNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hashpasswd = hashpasswd;
        this.phoneNumber = phoneNumber;
    }
}

module.exports = User;