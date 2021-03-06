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
    feedback: {
        type: String,
        default: ""  
    }

},
{
    collection: "Essays"
});

module.exports = mongoose.model("Essay", Essay);