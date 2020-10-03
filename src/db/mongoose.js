const mongoose = require('mongoose');

// "process.env.MONGODB_URI" is for MongoDB Atlas password
let MONGODB_URI = process.env.MONGODB_URI; 

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false }).then(() => {
    console.log("Database Connected...");
}).catch(e => {
    console.log(`Database Connection FAILED! \nError: ${e}`);
})

module.exports = {mongoose}