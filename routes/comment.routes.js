const express = require('express');
const router = express.Router();

const commentModel = require('../models/comment.model')

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const docs = await commentModel.find()
        return res.status(200).json(docs)
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

router.get('/page/:id', function (req, res, next) {

    var page = Number(req.params.id)

    /* Lấy 2 phần tử mỗi trang */
    const PAGE_SIZE = 2
    const NEXT = (page - 1) * PAGE_SIZE

    commentModel.find({})
        .skip(NEXT)
        .limit(PAGE_SIZE)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
        })


});

router.post('/register', async (req, res, next) => {

    try {

        const checkCmt = await commentModel.findOne({ name: req.body.data.name })
        if (checkCmt == null) {
            const item = new commentModel({
                msgReview: req.body.data.msgReview,
                name: req.body.data.name,
                star: req.body.data.star,
                today: req.body.data.today

            })
            item.save()
            return res.status(200).json("Add Comment Success")
        }
        else {
            return res.status(400).json("Add Comment Error")
        }



    } catch (err) {
        return res.status(400).json(err);
    }
});




module.exports = router;