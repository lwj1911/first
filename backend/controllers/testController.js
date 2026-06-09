const testModel = require("../models/Test")
const { success } = require("../utils/response")

const onTest = async (req,res)=>{
    const {text} = req.body
    const result = await testModel.create({ text })
    return success(res, result)
}

module.exports = { onTest };