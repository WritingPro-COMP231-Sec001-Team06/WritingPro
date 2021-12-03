let mongoose = require('mongoose');

let Answer = mongoose.Schema({
    answerID: String,
    examID: String,
    promptID: String,
    answerBody: String,
    wordCount: String
},
{
    collection: "Answer"
});

module.exports = mongoose.model("Answer", Answer);