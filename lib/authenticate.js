let jwt = require('jsonwebtoken');
let UserService = require('./../services/user');

let authenticate = {};

authenticate.verifyToken = async function (req, res, next){
    let token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.headers['authorization'];

    if(token){
        jwt.verify(token, 'mySecret', async (err, decodedData)=>{
            try {
                if(decodedData){
                    let user = await UserService.readUserById(decodedData.id);

                    if(user){
                        req.login = user;
                        next();
                    } else{
                        res.status(401).json({error: 'not a valid token'})
                    }
                } else{
                    res.status(401).json({error: 'not a valid token'})
                }
            } catch (error) {
                next(error)
            }
        });
        

        
    } else{
        res.status(401).json({
            error: 'missing token'
        })
    }
}

authenticate.isAdmin = function(req, res, next){
    let user = req.login;
    let userRole = user.role;

    if(userRole.indexOf('admin') > -1){
        next()
    } else{
        res.status(401).json({
            error: 'only admin has access'
        });
    }
}

module.exports = authenticate;