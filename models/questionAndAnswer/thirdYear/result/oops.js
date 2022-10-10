const mongoose = require("mongoose");

const oopsResultSchema = new mongoose.Schema(
    {
        universityRoll : {
            type: Number,
            require: true,
            unique: true,
            trim: true
        },
        name : {
            type: String,
            require: true,
            trim: true,
        },
        marks: {
            type: Number,
            require: true,
            trim: true
        },
        department: {
            type: String,
            required: true,
            trim: true
        }
    }
)

module.exports = new mongoose.model("oopsResult" , oopsResultSchema);