const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const gradeSchema = new Schema({
    name: { type: String }
}, { collection: 'Grades' });

module.exports = mongoose.model('Grades', gradeSchema);



