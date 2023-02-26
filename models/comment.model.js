const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
    msgReview: { type: String },
    name: { type: String },
    star: { type: String },
    today: { type: String }
}, { collection: 'Comment' });

module.exports = mongoose.model('Comment', commentSchema);



