let mongoose = require('mongoose');

let documentMetadata = mongoose.Schema({
    instructorId: String,
    title: String,
    description: String,
    filename: String,
    status: String,
    dateUploaded: {
        type: Date,
        default: Date.now()
    },
    fullName: String
},
{
    collection: "DocumentMetadata"
});

module.exports = mongoose.model("DocumentMetadata", documentMetadata);