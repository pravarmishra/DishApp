const path=require('path')
const express=require('express')
const dotenv=require('dotenv')
const colors=require('colors')
const morgan=require('morgan')
const connectDB=require('./config/db')


dotenv.config({path:'./config/config.env'})
connectDB();
const dishes=require('./routes/dishes')
const app=express();
app.use(express.json())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use('/api/v1/dishes',dishes)
if(process.env.NODE_ENV==='production'){
    app.use(express.static('dishapp/build'))

    app.get('*' , (req,res)=>res.sendFile(path.resolve(__dirname,'dishapp','build','index.html')))

}
const PORT=process.env.PORT || 9000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))