const express=require('express')
const mongoose=require('mongoose')
const router=express.Router();

const userSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:100
    },
    last_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:100
    },
    email_id: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        var :validateEmail = function(email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
        },
        
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phonenumber:{
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    }
}) 

const Users= mongoose.model('Users',userSchema)
router.get('/',async(req,res)=>{
    
    const users=await Users.find().sort('first_name')
    res.send(users);
});


router.post('/',async(req,res)=>{
    let users=new Users({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phonenumber:req.body.phonenumber
    })
    if(!users) return res.status(404).send('error occurred pls try again')
    try {
        users=await users.save();
        res.status(200).json(users)
    } catch (error) {
        
        console.log(error);
    }
    
       
    
    
        res.status(404).send(error.message)
    
   
    
})


router.put('/:id',async(req,res)=>{
  const users=await  Users.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phonenumber:req.body.phonenumber},{new:true})
        if(!users) return res.status(404).send('error occurred pls try again')
   
        res.status(200).send(users)
   
        res.send(error)
        
    
})

router.delete('/',async (req,res)=>{
    const users=await Users.findByIdAndRemove(req.params.id)
    if(!users) return res.status(404).send('error occurred pls try again')
   
        res.status(200).send(users)
  
        res.status(404).send(error)
    

})


router.get('/',async(req,res)=>{
    const users=await Users.findById(req.params.id);
    if(!users) return res.status(404).send('error occurred pls try again')
    
        res.status(200).send(users)
  
        res.status(404).send(error)
    
    
})














module.exports = router;
