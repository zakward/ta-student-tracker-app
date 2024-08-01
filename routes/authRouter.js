const express = require("express")
const authRouter = express.Router();
const Instructor = require("../models/instructor")
const jwt = require('jsonwebtoken')


authRouter.post("/signup", async (req, res, next) => {
    try {
        const userCheck = await Instructor.findOne({ email: req.body.email });
        if (userCheck){
            res.status(401)
            return next(new Error('Instructor already exists'))
        }
        const newUser = new Instructor(req.body)
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({token, user: savedUser.withoutPassword()})
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

authRouter.post("/login", async (req, res, next) => {
    try {
        const user = await Instructor.findOne({ email: req.body.email });
        if (!user) {
            res.status(401)
            return next(new Error('Invalid credentials'))
        }
        const isMatch = await user.checkPassword(req.body.password)
        if (!isMatch) {
            res.status(401)
            return next(new Error('Invalid credentials'))
        }
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
        return res.status(200).send({token, user: user.withoutPassword()})
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = authRouter;