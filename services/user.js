let UserModel = require('./../models/users');

let userService = {};

userService.createUser = async function(userData){
    let newUser = new UserModel({
        email: userData.email,
        password: userData.password,
        DOB: userData.DOB,
        username: userData.username,
        role: userData.role
    });

    let savedUser = await newUser.save();
    delete savedUser._doc.password;
    return savedUser;
}

userService.readUser = async function(email){
    return await UserModel.findOne({email});
}

userService.updateUser = async function(userUpdatedData){
    return await userUpdatedData.save();
}

userService.deleteUser = async function(email){
    return await UserModel.deleteOne({email});
}

userService.readUserById = async function(id){
    return await UserModel.findById(id);
}

module.exports = userService;