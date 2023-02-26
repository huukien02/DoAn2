const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const teacherSchema = new Schema({
    name: { type: String },
    gender: { type: String },
    date: { type: String },
    address: { type: String },
    level: { type: String },

    code: { type: String },
    phone: { type: String },
    nation: { type: String },
    religion: { type: String },


    gmail: { type: String },
    password: { type: String },
    role: { type: String }

}, { collection: 'Teachers' });

module.exports = mongoose.model('Teachers', teacherSchema);



