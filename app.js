const express = require('express');
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const config = require("./config/configuration.js");
const authRoutes = require('./routes/auth')

/*mongoose.connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database ");
        })
        .catch((err) => {
            console.log(err);
        });
mongoose.set( `useNewUrlParser`, true );
mongoose.set( "useFindAndModify", false );
mongoose.set( "useCreateIndex", true );
mongoose.set( "useUnifiedTopology", true );
*/
mongoose.connect(
    config.DATABASE,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// routes middliware
app.use('/api',authRoutes);


const port = process.env.PORT || 8000
app.listen(port , ()=> {
    console.log((`Server is running on port ${port}`))
})
