
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let VisitorSchema = Schema({
    username: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    firstLanguage: String,
    startingIELTSLevel: Number,
    targetScore: Number,
    targetTestCountry: String,
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'visitors'
});

VisitorSchema.plugin(passportLocalMongoose);


module.exports.Visitor = Model('Visitor', VisitorSchema);
