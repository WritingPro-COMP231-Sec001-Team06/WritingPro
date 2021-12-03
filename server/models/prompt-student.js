let mongoose = require('mongoose');

let studentPrompts = mongoose.Schema({
    isTask1: Boolean,
    isAcademic: Boolean,
    imageDescription: String,
    dateCreated: {
        type: Date,
        default: Date.now()  
    },
    imageUrl: String,
    promptMessage: String,
    isActive: Boolean
},
{
    collection: "StudentPrompts"
});

module.exports = mongoose.model("StudentPrompts", studentPrompts);