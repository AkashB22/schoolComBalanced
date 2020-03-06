let balancedFunction = require('./../lib/balanced');
let balancedController = {};

balancedController.check = async function(req, res, next){
    let inputStr = req.body.inputStr;

    try {
       let result = await balancedFunction.run(inputStr);

        res.status(200).json({result}); 
    } catch (error) {
        next(error)
    }
}


module.exports = balancedController;