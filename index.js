const express = require("express");
require("dotenv").config();
const app = express()
const Policy = require("./model/policy")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const cors = require('cors');
//db connection

mongoose.connect("mongodb+srv://rohit2010:rohit2010@cluster0.3ojbu.mongodb.net/test?retryWrites=true&w=majority", 
    {       useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> {
    console.log("DB CONNECTED")
    
}).catch((err) => console.log(err))
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.post("/savepolicy" , (req,res) => {
    const policy = new Policy(req.body)
    policy.save().then(policy =>{
        res.json({
            data:policy
        })
        .catch(err => console.log(err))
    })
})

app.listen(PORT, () => console.log(`app is running at ${PORT}`))