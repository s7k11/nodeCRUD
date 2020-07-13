var express = require('express');
var router = express.Router();

let Customer=require('../models/customer');

let {encryptPassword,comparePassword}=require('../utils/bcyrptConfig')

//////////////////////////////////create new customer

router.post('/',async (req,res)=>{
     try{
        const emailCheck=await Customer.findOne({email:req.body.email}).exec()
        if(emailCheck)
            throw new Error("Already registered")
        const hash=await encryptPassword(req.body.password);
        req.body.password=hash; 
         const customer=await new Customer(req.body).save();
         if(customer)
            res.json({ message: 'customer registered', success: true });
        else    
           throw new Error('ERROR')
     }
    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
})

router.get('/',async (req,res)=>{
     try{
         const customerArr=await Customer.find().exec();
         if(customerArr)
            res.json({ message: 'Customer', data:customerArr, success: true });
        else
            throw new Error('Server not responding')
     }
    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
});


router.patch('/updateCustomer/:id',async (req,res)=>{
     try{
         const customer=await Customer.findByIdAndUpdate(req.params.id,{active:true}).exec();
         res.json({ message: 'updated', success: true });
     }
    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
})

router.delete('/deleteCustomer/:id',async (req,res)=>{
     try{
        const customer=await Customer.findByIdAndRemove(req.params.id).exec();
        res.json({ message: 'Deleted', success: true });
     }
    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
})


router.post('/add',async (req,res)=>{
     try{
        const customerData=await new Customer(req.body).save();
        if(customerData)
            res.json({ message: 'data uploaded', success: true });
        else
            throw new Error('Something went wrong')
    }

    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
});

router.get('/getData',async (req,res)=>{
     try{
        const customerData=await Customer.find().exec();
        if(customerData)
            res.json({ message: 'data',data:customerData, success: true });
        else
            throw new Error('Something went wrong')
    }
    catch(err){
         console.log(err);
         if(err.message)
             res.json({message:err.message,success:false})
         else 
             res.json({message:'Error',success:false}) 
     }
})



module.exports=router