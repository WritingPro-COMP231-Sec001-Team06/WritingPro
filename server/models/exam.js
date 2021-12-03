let mongoose = require('mongoose');

let Exam = mongoose.Schema({
    examID: String,
    studentID: String,
    dateCreated: Date,
    timeElapsed: Date,
    completedOnTime: Boolean
},
{
    collection: "Exam"
});

module.exports = mongoose.model("Exam", Exam);