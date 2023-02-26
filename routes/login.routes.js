const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')


/* Login */
router.post('/post', async (req, res, next) => {
    try {
        const checkLoginStudent = await studentModel.findOne({ gmail: req.body.gmail, password: req.body.password })
        const checkLoginTeacher = await teacherModel.findOne({ gmail: req.body.gmail, password: req.body.password })



        if (checkLoginStudent == null && checkLoginTeacher == null) {
            return res.status(400).json("Login err");
        }
        else if (checkLoginStudent) {

            const id = checkLoginStudent._id
            const name = checkLoginStudent.name
            const gmail = checkLoginStudent.gmail
            const role = checkLoginStudent.role

            let infor = {
                id: id,
                gmail: gmail,
                role: role,
                name: name
            }

            let token = jwt.sign(infor, 'suyt');

            return res.status(200).json({
                message: 'Login thành công',
                token: token
            })
        }
        else if (checkLoginTeacher) {

            const id = checkLoginTeacher._id
            const name = checkLoginTeacher.name
            const gmail = checkLoginTeacher.gmail
            const role = checkLoginTeacher.role

            let infor = {
                id: id,
                gmail: gmail,
                role: role,
                name: name
            }

            let token = jwt.sign(infor, 'suyt');

            return res.status(200).json({
                message: 'Login thành công',
                token: token
            })
        }

    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;