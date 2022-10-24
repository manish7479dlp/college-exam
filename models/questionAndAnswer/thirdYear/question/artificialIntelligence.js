const mongoose = require("mongoose")

const artificialIntelligenceSchema = new mongoose.Schema({
    question: {
        type : String,
        unique : true,
        required : true
    },
    opt1 : {
        type : String,
        required : true
    },
    opt2 : {
        type : String,
        required : true
    },
    opt3 : {
        type : String,
        required : true
    }, 
    opt4 : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }

})
module.exports = new mongoose.model("artificialIntelligenceQuestions", artificialIntelligenceSchema);