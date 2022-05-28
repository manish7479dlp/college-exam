const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model("Admindetails", AdminSchema);
