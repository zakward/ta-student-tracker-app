const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const {expressjwt} = require("express-jwt")
require("dotenv").config()
const PORT = process.env.PORT || 7000
const MONGO_URI = process.env.MONGO_URI
const app = express()


app.use(express.json())
app.use(morgan("dev"))


const connectToDB = async ()=> {
   try {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to DB")
   } catch (error) {
    console.log(error)
   } 

}

connectToDB()

app.use("/api/auth", require("./routes/authRouter"))
app.use("/api/protected", expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
// app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use("/api/protected/students", require("./routes/studentRouter"))



app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    res.send({errMsg: err.message})
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))