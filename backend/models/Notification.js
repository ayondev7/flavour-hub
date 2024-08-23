const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    commentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    chefId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Notification', NotificationSchema);
