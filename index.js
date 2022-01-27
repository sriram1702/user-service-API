const express=require('express')
const mongoose=require('mongoose')
const bodyparser = require('body-parser');
const morgan = require('morgan')

const Joi=require('Joi')
const userservices=require('./routes/user_services');
const app=express()


mongoose.connect('mongodb://localhost/user-services')
.then(()=>console.log('Connected to mongodb'))
.catch(err=>console.error('could not connect to mongodb'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({    
  extended: true
}));
app.use('/userservices',userservices);
app.use(express.json())

app.use(morgan('tiny'))

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));

