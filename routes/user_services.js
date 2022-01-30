const express=require('express')
const mongoose=require('mongoose')
const router=express.Router();
const {Usersssss}=require('../models/usermodel')
const Users=require('../models/usermodel.js')
const Joi=require('joi');
const { string } = require('joi');
const schema = Joi.object({
    first_name:Joi.string().min(2).required(),
    last_name:Joi.string().min(2).required(),
    email_id: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    phonenumber:Joi.string().max(10).pattern(/^[0-9]+$/).required(),
});








router.post('/create-user',async(req,res)=>{
    const {error}=schema.validate(req.body)

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    let users=await Users.findOne({email_id:req.body.email_id})
    if (users) return res.status(400).send('User already registered.')
     users=new Users({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phonenumber:req.body.phonenumber
    })
      if(!users) return res.status(404).send('error occurred please try again')
    try {
       await users.save();
       res.json({ status : 200,message : "User Created Successfully", });
        
    } catch (error) {
        res.status(500).send('Some error occurred ')
    
        console.log(error);
     
    }
    
       
    
    
    
    
   
    
})
router.get('/',async(req,res)=>{
  
  
    if(req.url!='/') return res.status(500).send("please check the url")
    const users=await Users.find().sort('first_name')
    if(!users) return res.status(404).send('error occurred please try again')
    res.send(users);
  
});




    
       
    



router.put('/:id',async(req,res)=>{

    const {error}=schema.validate(req.body)

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
      
  const users=await  Users.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phonenumber:req.body.phonenumber},{new:true})
        
          
        if(!users) return res.status(404).send('the user with the given id is not found')
   try{
    res.json({ status : 200,message : "Updated Successfully", });   }
   catch(error){
    res.status(500).send('some error occurred need to check')

   }
        
        
    
})


router.delete('/:id',async (req,res)=>{
   
    const users=await Users.findByIdAndRemove(req.params.id)
    if(!users) return res.status(404).send('error occurred please try again')
   try{
    res.json({ status : 200,message : "Deleted Successfully", });    
   }
   catch(err){

   
        res.status(500).send('some error occured need to check')
   }

})


router.get('/:id',async(req,res)=>{
   
    const users=await Users.findById(req.params.id);
    if(!users) return res.status(404).send('error occurred please try again')
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send('some error occured')
    }
       
  
       
    
    
})


router.patch('/:id',async(req,res)=>{

   
  const users=await  Users.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phonenumber:req.body.phonenumber},{new:true})
        
          
        if(!users) return res.status(404).send('the user with the given id is not found')
   try{
        res.status(200).send(users)
   }
   catch(error){
    res.status(500).send('some error occurred ')

   }
        
        
    
})







module.exports = router;
