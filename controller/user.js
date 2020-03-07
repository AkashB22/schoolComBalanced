let userService = require('./../services/user');
let userController = {};

userController.createUser = async function(req, res, next){
    let userData = {};

    userData.email = req.body.email;
    userData.password = req.body.password;
    userData.DOB = req.body.DOB;
    userData.username = req.body.username;
    userData.role = req.body.role;

    try {
        let savedUser = await userService.createUser(userData);

        if(savedUser){
            res.status(200).json({
                message: "success"
            });
        }
    } catch (error) {
        next(error)
    }
}

userController.readUser = async function(req, res, next){
    let email = req.query.email;

    try {
        let user = await userService.readUser(email);

        if(user) {
            delete user._doc.password;
            res.status(200).json({ user: user, message: 'success' });
        } else res.status(200).json({message: 'no user found'});
        
    } catch (error) {
        next(error)
    }
}

userController.updateUser = async function(req, res, next){
    let email = req.query.email;
    let userUpdatedData = {};

    userUpdatedData.email = req.body.email;
    userUpdatedData.password = req.body.password;
    userUpdatedData.DOB = req.body.DOB;
    userUpdatedData.username = req.body.username;
    userUpdatedData.role = req.body.role;

    try {
        let user = await userService.readUser(email);

        user.email = userUpdatedData.email !== undefined && userUpdatedData.email.length > 0 ? userUpdatedData.email: user.email;
        user.password = userUpdatedData.password !== undefined && userUpdatedData.password.length > 0 ? userUpdatedData.password: user.password;
        user.DOB = userUpdatedData.DOB !== undefined && userUpdatedData.DOB.length > 0 ? userUpdatedData.DOB: user.DOB;
        user.username = userUpdatedData.username !== undefined && userUpdatedData.username.length > 0 ? userUpdatedData.username: user.username;
        user.role = userUpdatedData.role !== undefined && userUpdatedData.role.length > 0 ? userUpdatedData.role: user.role;

        let updatedUser = await userService.updateUser(user);

        if(updatedUser){
            res.status(200).json({message: "success"});
        }
    } catch (error) {
        next(error)
    }
}

userController.deleteUser = async function (req, res, next){
    let email = req.query.email;

    try {
        let deletedUser = await userService.deleteUser(email);

        res.status(200).json({message:'success'});
    } catch (error) {
        next(error);
    }

}

userController.loginUser = async function (req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    try {
        let user = await userService.readUser(email);

        if(user){
            if( await user.verifyPassword(password)){
                res.status(200).json({
                    token: user.generateJWT(),
                    message: "success"
                })
            } else{
                res.status(401).json({
                    error: "mismatch of password"
                })
            }
        } else{
            res.status(401).json({
                error: "user not found"
            })
        }    
    } catch (error) {
        next(error)
    }
}

userController.listUsers = async function(req, res, next){
    try {
        let listUsers = await userService.listUsers();

        res.status(200).json(listUsers);
    } catch (error) {
        next(error);
    }
}

module.exports = userController;