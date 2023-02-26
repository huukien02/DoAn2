const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentSchema = new Schema({
    name: { type: String },
    gender: { type: String },
    date: { type: String },
    address: { type: String },
    code: { type: String },
    phone: { type: String },
    nation: { type: String },
    religion: { type: String },
    grade: { type: String },
    class: { type: String },
    score: { type: String },
    gmail: { type: String },
    password: { type: String },
    role: { type: String }

}, { collection: 'Students' });

module.exports = mongoose.model('Students', studentSchema);



