const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    commentorId: { type: Schema.Types.ObjectId, ref: 'User'},
    followerId: { type: Schema.Types.ObjectId, ref: 'User'},
    likerId: { type: Schema.Types.ObjectId, ref: 'User'},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe'},
    type: { 
        type: String, 
        enum: ['comment', 'like', 'share','follow'], // Restrict values to 'comment', 'like', or 'share'
        required: true 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Notification', NotificationSchema);
