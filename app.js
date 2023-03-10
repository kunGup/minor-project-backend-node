const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRoutes = require('./routes/notes')
const foldersRoutes = require('./routes/folders')
const ytRoutes = require('./routes/ytsum')
const authRoutes = require('./routes/auth')
const morgan = require("morgan");
const expressValidator = require("express-validator");
const cors = require('cors')
require('dotenv').config()

//mongoose connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
    .then(()=>console.log('DB connnected'))
mongoose.connection.on('error',(err)=>{
    console.log(`DB connection error: ${err.message}`);
})

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"));
app.use(expressValidator())

app.use('/api/notes',notesRoutes)
app.use('/api/folders',foldersRoutes)
app.use("/api/ytsum", ytRoutes);
app.use("/api",authRoutes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})