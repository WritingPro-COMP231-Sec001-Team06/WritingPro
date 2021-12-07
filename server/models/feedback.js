let mongoose = require('mongoose');

let Feedback = mongoose.Schema({
    feedbackID: String,
    submissionID: String,
    instructorID: String,
    dateCreated: Date,
    feedbackBody: String,
    estimatedScore: Number
},
{
    collection: "Feedback"
});

module.exports = mongoose.model("Feedback", Feedback);