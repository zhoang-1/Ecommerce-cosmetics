const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        idPublic: {
            type: Boolean,
            default: false,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Category', categorySchema);
