const express = require("express")
const studentRouter = express.Router()
const Student = require("../models/student")


studentRouter.get("/", async (req, res, next) => {
    try {
        const foundStudents = await Student.find()
        return res.status(200).send(foundStudents)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


studentRouter.post("/", async (req, res, next) => {
    try {
        req.body.instructorName = req.auth.name
        req.body.assignedInstructor = req.auth._id
        const newStudent = new Student(req.body)
        const savedStudent = await newStudent.save()
        return res.status(201).send(savedStudent)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

studentRouter.get("/mystudents", async (req, res, next) => {
    try {
        const foundStudents =  await Student.find({assignedInstructor: req.auth._id})
        return res.status(200).send(foundStudents)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

studentRouter.put("/:id", async (req, res, next) => {
    try {
        const foundStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(201).send(foundStudent)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

studentRouter.delete("/:id", async (req, res, next) => {
    try {   
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)
        return res.status(201).send(`You successfully deleted ${deletedStudent.firstName} ${deletedStudent.lastName}`)
        
    } catch (error) {
        res.status(500)
        return next(error)
    }
})





module.exports = studentRouter