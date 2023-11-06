// UserModel class to represent user data

export default class UserModel{

    // Constructor to initialize a user object
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email,
        this.password = password;

    }

    // method to add a new user
    static add(name,email,password){
        const newUser = new UserModel(users.length+1, name, email, password);
        users.push(newUser);
    }

    //check if a user with the provided email and password exists
    static isValidUser(email,password){
        const result = users.find(u => u.email==email && u.password==password);
        return result;
    }

}

// Array containing users
var users = [];

