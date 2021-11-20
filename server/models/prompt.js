let mongoose = require('mongoose');

let prompt = mongoose.Schema({
    isTask1: Boolean,
    isAcademic: Boolean,
    dataType: String,
    dateCreated: Date,
    imageUrl: String,
    promptMessage: String
},
{
    collection: "Prompts"
});

module.exports = mongoose.model("Prompt", prompt);