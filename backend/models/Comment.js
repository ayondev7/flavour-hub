const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    content: { type: String, required: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Comment', CommentSchema);
