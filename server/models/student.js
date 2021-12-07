let mongoose = require('mongoose');

let Student = mongoose.Schema({
    studentID: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    firstLanguage: String,
    startingIELTSLevel: Number,
    targerScore: Number,
    targetTestCountry: String
},
{
    collection: "Student"
});

module.exports = mongoose.model("Student", Student);