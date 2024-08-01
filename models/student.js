const mongoose = require("mongoose")
const Schema = mongoose.Schema


const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    currLevel: {
        type: Number
    },
    progressPoint: {
        type: Number
    },
    assignedInstructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    },
    instructorName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})










module.exports = mongoose.model("Student", studentSchema)