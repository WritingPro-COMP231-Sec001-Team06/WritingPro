let mongoose = require('mongoose');

let Feedback = mongoose.Schema({
    submissionID: String,
    instructorID: String,
    dateCreated: {type: Date, default: Date.now()},
    feedbackBody: String,
    estimatedScore: Number
},
{
    collection: "Feedback"
});

module.exports = mongoose.model("Feedback", Feedback);