let BalancedModel = require('./../models/balanced');
let balancedService = {};

balancedService.create = async function(balancedData){
    let newBalancedData = new BalancedModel({
        user: balancedData.user,
        message: balancedData.message,
        attempts: balancedData.attempts
    });

    let savedBalanced = await newBalancedData.save();

    return savedBalanced;
}

balancedService.readUser = async function(user){
    return await BalancedModel.findOne({user});
}

balancedService.update = async function(updatedBalancedData){
    return await updatedBalancedData.save();
}

balancedService.delete = async function(username){
    return await BalancedModel.deleteOne({username});
}

module.exports = balancedService;