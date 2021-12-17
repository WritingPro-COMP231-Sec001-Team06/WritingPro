let mongoose = require('mongoose');

let MockTest = mongoose.Schema({
    studentID: String,
    dateCreated: {
        type: Date,
        default: Date.now()  
    },
    task1 : {
        type: String,
        default: ""
    },
    task2: {
        type: String,
        default: ""
    }
},
{
    collection: "MockTests"
});

module.exports = mongoose.model("MockTest", MockTest);