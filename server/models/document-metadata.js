let mongoose = require('mongoose');

let documentMetadata = mongoose.Schema({
    username: String,
    title: String,
    description: String,
    filename: String,
    status: String,
    dateUploaded: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "DocumentMetadata"
});

module.exports = mongoose.model("DocumentMetadata", documentMetadata);