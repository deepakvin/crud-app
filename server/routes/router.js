const express=require("express");
const router=express.Router();
const users=require('../models/userSchema');


/*router.get("/",(req,res)=>{
    console.log("connect");
});
*/
router.post('/register',async (req,res)=>{
    //console.log(req.body);
    const {name,email,age,mobile,work,address,description}=req.body;
    if(!name||!email||!age ||!mobile||!work ||!address ||!description){
        res.status(404).json('Fill data');
    }
    try{
        const preuser=await users.findOne({email:email});

        if(preuser){
            res.status(422).json("this  user is already present");
        }else{
            const adduser=new users({
                name,email,age,mobile,work,address,description
            });
            await adduser.save();
            res.status(200).json(adduser);
            console.log(adduser);
        }

    }catch(error){
        res.status(404).json(error)
    }

})
//get userdata
router.get("/getdata",async(req,res)=>{
    try{
        const userdata=await users.find();
        res.status(201).json(userdata)
        console.log(userdata);


    }catch(error){
        res.status(422).json(error)

    }
    
})
//get individual user
router.get("/getuser/:id",async(req,res)=>{
    
    try{
        console.log(req.params);
        const {id}=req.params;
         userindividual=await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    }catch(error){
        res.status(422).json(userindividual)

    }
})

//update user data
router.patch('/updateuser/:id',async (req,res)=>{
    try{
        console.log(req.params);
        const {id}=req.params;
        const updateduser=await users.findByIdAndUpdate({_id:id},req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);

    }catch(error){
        res.status(422).json(error);

    }
})
//delete user
router.delete("/deleteuser/:id",async (req,res)=>{
    try{
        console.log(req.params);
        const {id}=req.params;
        const deletuser=await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    }catch(error){
        res.status(422).json(error);

    }

})




module.exports=router;