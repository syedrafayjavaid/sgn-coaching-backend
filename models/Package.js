const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Package title is required"],
        trim: true,
        maxlength: [50, "Package name can not be more than 50 characters"]
    },
    detail: {
        type: String,
        required: [true, "Package detail is required"],
    },
    price: {
        type: Number,
        required: [true, "Package price is required"],
        trim: true,
    },
    duration: {
        type: String,
        required: [true, "Duration is required"],
        trim: true,
        enum: ["month", "year", "day", "week", "lifetime"]
    },
    coachId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Coach",
        index: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
        enum: ['self', 'admin'],
        maxlength: [50, "The creater's name cannot be more than 50 characters long"]
    },
    modifiedOn: {
        type: Date
    },
    modifiedBy: {
        type: String,
        trim: true,
        enum: ['self', 'admin'],
        maxlength: [50, "The modifier's name cannot be more than 50 characters long"]
    },
})

module.exports = mongoose.model('Package', packageSchema);
