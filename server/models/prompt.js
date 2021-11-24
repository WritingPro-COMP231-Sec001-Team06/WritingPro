let mongoose = require('mongoose');

let prompt = mongoose.Schema({
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
    collection: "Prompts"
});

module.exports = mongoose.model("Prompts", prompt);