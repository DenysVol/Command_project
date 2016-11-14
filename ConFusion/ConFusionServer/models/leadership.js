var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var leadershipSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    abbr:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
},{
    timpestamps : true
});

var Leaders = mongoose.model('Leader', leadershipSchema);

module.exports = Leaders;