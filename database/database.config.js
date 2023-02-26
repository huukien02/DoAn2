const mongoose = require('mongoose')
const url = 'mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/DoAn?retryWrites=true&w=majority'
const connectDB = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connect Mongodb success");
    })
    .catch((err) => {
        throw err;
    });

module.exports = connectDB