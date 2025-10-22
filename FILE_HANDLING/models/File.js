const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    image : {
        type : String,
    },
    tahs : {
        type : String,
    },
    email : {
        type : String
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;