let mongoose = require('mongoose');

let Essay = mongoose.Schema({
    studentID: String,
    dateCreated: {
        type: Date,
        default: Date.now()  
    },
    status: String,
    wordCount: Number,
    IELTSType: String,
    promptId: String,
    essayBody: String,
    essayPart: String,
    clarification: {
        type: String,
        default: ""  
    },
    firstfeedback: {
        type: String,
        default: ""  
    },
    secondfeedback: {
        type: String,
        default: ""  
    },
},
{
    collection: "Essays"
});

module.exports = mongoose.model("Essay", Essay);