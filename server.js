if (process.env.NODE_ENV !=='production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
app.set('view-engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout.ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
const DB = mongoose.connection;
DB.on('error',error=>console.error(error))
DB.once('open',()=>console.log('db connected'))
app.listen(process.env.PORT || 3000)