const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const classSchema = new Schema({
    nameTeacher: { type: String },
    idTeacher: { type: String },
    nameGrade: { type: String },
    nameClass: { type: String }
}, { collection: 'Class' });

module.exports = mongoose.model('Class', classSchema);



