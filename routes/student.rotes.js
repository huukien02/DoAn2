const express = require('express');
const router = express.Router();

const studentModel = require('../models/student.model')

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const docs = await studentModel.find()
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* Pagination */
router.get('/page/:id', function (req, res, next) {

    const page = Number(req.params.id)
    /* Lấy 2 phần tử mỗi trang */
    const PAGE_SIZE = 5
    const NEXT = (page - 1) * PAGE_SIZE

    studentModel.find({})
        .skip(NEXT)
        .limit(PAGE_SIZE)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })


});

/* GET byID */
router.get('/detail/:id', async (req, res, next) => {
    try {
        const docs = await studentModel.findById(req.params.id)
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* DELETE byID */
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await studentModel.deleteOne({ _id: req.params.id })
        return res.status(200).json('Delete user success')
    }
    catch (err) {
        return res.status(400).json(err);
    }
});


/* POST User */
router.post('/register', async (req, res, next) => {
    try {
        const item = new studentModel({
            name: req.body.data.name,
            gender: req.body.data.gender,
            date: req.body.data.date,
            address: req.body.data.address,
            code: req.body.data.code,
            phone: req.body.data.phone,
            nation: req.body.data.nation,
            religion: req.body.data.religion,
            grade: req.body.data.grades,
            class: req.body.data.clas,
            score: req.body.data.score,
            gmail: req.body.data.gmail,
            password: req.body.data.password,
            role: req.body.data.role,
        })
        item.save()
        return res.status(200).json("Add student Success")

    } catch (err) {
        return res.status(400).json(err);
    }
});

/* UPDATE */
router.put('/update', async (req, res, next) => {
    try {

        await studentModel.updateOne({ _id: req.body.data.currentId },
            {
                name: req.body.data.currentName,
                gender: req.body.data.currentGender,
                date: req.body.data.currentDate,
                address: req.body.data.currentAddress,
                code: req.body.data.currentCode,
                phone: req.body.data.currentPhone,
                nation: req.body.data.currentNation,
                religion: req.body.data.currentReligion,
                grade: req.body.data.currentGrades,
                class: req.body.data.currentClass,
                score: req.body.data.currentScore,
                gmail: req.body.data.currentGmail,
                password: req.body.data.currentPassword,
                role: req.body.data.currentRole,
            })
        res.status(200).json("Update thành công")

    } catch (err) {
        return res.status(400).json(err);
    }

});




module.exports = router;
