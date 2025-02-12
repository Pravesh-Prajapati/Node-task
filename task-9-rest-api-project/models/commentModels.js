const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    comments: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['Users']
    },
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;