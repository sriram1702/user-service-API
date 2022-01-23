const express=require('express')
const mongoose=require('mongoose')
const bodyparser = require('body-parser');
const userservices=require('./routes/user_services');
const app=express()


mongoose.connect('mongodb://localhost/user-services')
.then(()=>console.log('Connected to mongodb'))
.catch(err=>console.error('could not connect to mongodb'))
app.use('/userservices',userservices);
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));
