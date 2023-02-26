const express = require('express');
const router = express.Router();

const gradesModel = require('../models/grade.model')

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const docs = await gradesModel.find()
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

router.post('/register', async (req, res, next) => {

    try {

        const checkGrades = await gradesModel.findOne({ name: req.body.data.grade })

        if (checkGrades == null) {
            const item = new gradesModel({
                name: req.body.data.grade,
            })
            item.save()
            return res.status(200).json("Add Grades Success")
        }
        else {
            return res.status(400).json('Add Grades error')
        }



    } catch (err) {
        return res.status(400).json(err);
    }
});

/* DELETE byID */
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await gradesModel.deleteOne({ _id: req.params.id })
        return res.status(200).json('Delete grades success')
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

/* UPDATE */
router.put('/update', async (req, res, next) => {
    try {
        const checkGrades = await gradesModel.findOne({ name: req.body.data.currentGrade })

        if (checkGrades == null) {
            await gradesModel.updateOne({ _id: req.body.data.currentId },
                {
                    name: req.body.data.currentGrade,
                })
            res.status(200).json("Update thành công")
        }
        else {
            return res.status(400).json('Update error');
        }



    } catch (err) {
        return res.status(400).json(err);
    }

});

module.exports = router;
