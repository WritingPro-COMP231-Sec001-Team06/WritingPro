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
    prompt: String,
    essayBody: String,
    essayPart: String
},
{
    collection: "Essays"
});

module.exports = mongoose.model("Essay", Essay);