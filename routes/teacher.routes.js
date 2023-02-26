const express = require('express');
const router = express.Router();

const teacherModel = require('../models/teacher.model')
const classModel = require('../models/class.model')

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const docs = await teacherModel.find()
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* GET byID */
router.get('/detail/:id', async (req, res, next) => {
    try {
        const docs = await teacherModel.findById(req.params.id)
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});


/* Pagination */
router.get('/page/:id', async (req, res, next) => {

    const page = Number(req.params.id)
    /* Lấy 2 phần tử mỗi trang */
    const PAGE_SIZE = 5
    const NEXT = (page - 1) * PAGE_SIZE

    teacherModel.find({})
        .skip(NEXT)
        .limit(PAGE_SIZE)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })


});

/* POST */
router.post('/register', async (req, res, next) => {
    try {
        const checkGmail = await teacherModel.findOne({ gmail: req.body.data.gmail })
        if (checkGmail != null) {
            return res.status(400).json('Gmail error');
        }
        else {
            const item = new teacherModel({
                name: req.body.data.name,
                gender: req.body.data.gender,
                date: req.body.data.date,
                address: req.body.data.address,
                level: req.body.data.level,

                code: req.body.data.code,
                phone: req.body.data.phone,
                nation: req.body.data.nation,
                religion: req.body.data.religion,

                gmail: req.body.data.gmail,
                password: req.body.data.password,
                role: req.body.data.role,
            })
            item.save()
            return res.status(200).json("Add Teacher Success")
        }


    } catch (err) {
        return res.status(400).json(err);
    }
});

/* DELETE byID */
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const checkTeacher = await teacherModel.findById({ _id: req.params.id })
        const nameTeacher = checkTeacher.name;

        await classModel.deleteMany({ nameTeacher: nameTeacher })
        await teacherModel.deleteOne({ _id: req.params.id })
        return res.status(200).json('Delete teacher success')
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* UPDATE */
router.put('/update', async (req, res, next) => {
    try {

        await teacherModel.updateOne({ _id: req.body.data.currentId },
            {
                name: req.body.data.currentName,
                gender: req.body.data.currentGender,
                date: req.body.data.currentDate,
                address: req.body.data.currentAddress,
                level: req.body.data.currentLevel,

                code: req.body.data.currentCode,
                phone: req.body.data.currentPhone,
                nation: req.body.data.currentNation,
                religion: req.body.data.currentReligion,

                gmail: req.body.data.currentGmail,
                password: req.body.data.password,
                role: req.body.data.currentRole,
            })
        res.status(200).json("Update thành công")

    } catch (err) {
        return res.status(400).json(err);
    }

});




module.exports = router;
