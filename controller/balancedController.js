let balancedFunction = require('./../lib/balanced');
let balancedService = require('./../services/balanced');

let balancedController = {};

balancedController.check = async function(req, res, next){
    let user = req.login.username;
    let inputStr = req.body.inputStr;

    try {
        let result = await balancedFunction.run(inputStr);
        let balancedData = await balancedService.read(user);
        if(balancedData){
            balancedData.increaseAttempts();
            if(!(result.indexOf('unbalanced') > -1)){
                balancedData.message = 'success';
            } else{
                balancedData.message = '';
            }
            let updatedBalancedData = await balancedService.update(balancedData);
            res.status(200).json({updatedBalancedData});
        } else{
            let newBalancedData = {};
            newBalancedData.user = user
            newBalancedData.attempts = 1;
            if(!(result.indexOf('unbalanced') > -1)){
                newBalancedData.message = 'success';
            } else{
                newBalancedData.message = '';
            }
            let savedBalancedData = await balancedService.create(newBalancedData);
            res.status(200).json({savedBalancedData});
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports = balancedController;