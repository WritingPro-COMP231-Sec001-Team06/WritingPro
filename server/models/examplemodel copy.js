let mongoose = require('mongoose');

let TaskSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: Date
},
{
    collection: "tasks"
});

module.exports = mongoose.model("Tasks", TaskSchema);