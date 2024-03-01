const mongoose = require('mongoose');
const{Schema} = mongoose;

//create a schema
const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
    },
    jobTitle: String,
    company:String,
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
})

//create our new model

const user = mongoose.model('user', userSchema);

module.exports = user;