const mongoose= require("mongoose")


const testSchema = new mongoose.Schema({
    text:String
    
})
module.exports = mongoose.model("Test",testSchema)