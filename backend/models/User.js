const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true // Automatically trims leading and trailing whitespace
    },
    email: { 
        type: String, 
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Store email in lowercase
        trim: true, // Automatically trims leading and trailing whitespace
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    password: { 
        type: String, 
        required: true 
    },
    image: { 
        type: Buffer, 
        required: true 
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});


module.exports = mongoose.model('User', UserSchema);
