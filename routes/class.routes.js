const express = require('express');
const router = express.Router();

const classModel = require('../models/class.model')
const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const docs = await classModel.find()
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

router.get('/:grade', async function (req, res, next) {

    try {
        const docs = await classModel.find({ nameGrade: req.params.grade })
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

router.post('/register', async (req, res, next) => {

    const checkClass = await classModel.findOne({ nameClass: req.body.data.clas })
    const teacher = await teacherModel.findById(req.body.data.teacher)
    try {
        if (checkClass != null) {
            return res.status(400).json({ msg: 'Lớp này đã tồn tại' });
        } else {
            const item = new classModel({
                nameTeacher: teacher.name,
                idTeacher: req.body.data.teacher,
                nameGrade: req.body.data.grades,
                nameClass: req.body.data.clas,

            })
            item.save()
            return res.status(200).json("Add Class Success")
        }


    } catch (err) {
        return res.status(400).json(err);
    }
});

/* DELETE byID */
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const checkClass = await classModel.findById({ _id: req.params.id })
        const nameClass = checkClass.nameClass;
        await studentModel.deleteMany({ class: nameClass })

        await classModel.deleteOne({ _id: req.params.id })
        return res.status(200).json('Delete teacher success')
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* UPDATE */
router.put('/update', async (req, res, next) => {
    try {

        const checkClass = classModel.findOne({ nameClass: req.body.data.currentClass })

        if (checkClass != null) {
            return res.status(400).json({ msg: 'Lớp này đã tồn tại' });
        }
        else {
            const checkTeacher = teacherModel.findById(req.body.data.currentTeacher)
            const nameTeacher = checkTeacher.name;

            await classModel.updateOne({ _id: req.body.data.currentId },
                {
                    nameTeacher: nameTeacher,
                    nameGrade: req.body.data.currentGrades,
                    nameClass: req.body.data.currentClass,
                    idTeacher: req.body.data.currentTeacher,
                })
            res.status(200).json("Update thành công")
        }



    } catch (err) {
        return res.status(400).json(err);
    }

});


module.exports = router;
