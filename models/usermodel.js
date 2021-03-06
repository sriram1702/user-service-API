const mongoose=require('mongoose')
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
        
        
    },

 }) 
 const Users= mongoose.model('Users',userSchema)

 module.exports=Users;

