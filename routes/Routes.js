// import Model from '../model/Model';

const express = require('express');
// const Model = require('../models/Model');
const bcrypt = require('bcrypt');
const router = express.Router()
const ModelGuitar = require('../models/modelGuitar');
const ModelUser = require('../models/modelUser');

//Post Method Add Product
router.post('/addProduct', async (req, res) => {
    const data = new ModelGuitar({
        name: req.body.name,
        quantity: req.body.quantity || 0,
        price: req.body.price || 0,
        sale: 0,
        type: req.body.type || "Đang cập nhật !",
        color: [req.body.type] || [],
        urlImg: req.body.urlImg,

    })

    try {
        const dataToSave = await data.save();
        
        res.json({status: 200 , message: "Sản Phẩm Đã Được Thêm !"});
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get all Guitar
router.get('/getallproduct', async (req, res) => {
    try{
        const data = await ModelGuitar.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID one guitar
router.get('/getoneproduct/:id', async (req, res) => {
    try{
        const data = await ModelGuitar.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.json({status: 200,message: error.message})
    }
})

//Update by ID update guitar
router.put('/updateProduct/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await ModelGuitar.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send({status: 200, message: "Update successfully"})
    }
    catch (error) {
        res.json({status: 400, message: error.message })
    }
})

//Update by ID update User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ModelUser.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send({status: 200, message: "Update successfully"})
    }
    catch (error) {
        res.json({status: 400, message: error.message })
    }
})
//Delete by ID delete product
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ModelGuitar.findByIdAndDelete(id)
        console.log(data);
        res.json({status: 200 ,message: data.name})
    }
    catch (error) {
        res.json({status: 400, message: error.message })
    }
})

//Delete by ID delete user
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ModelUser.findByIdAndDelete(id)
        console.log(data);
        res.json({status: 200 ,message: data.name})
    }
    catch (error) {
        res.json({status: 400, message: error.message })
    }
})





router.post('/signup', async (req, res) => {
    console.log(req.body);
    const date = new Date()
    console.log(date)
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const data2 = new ModelUser({
        name: req.body.name,
        password: passwordHash,
        email: req.body.email,
        address: req.body.address || '',
        role: "Customer",
        urlImg: req.body.url || '',
        dateCreate: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        Cart: []

    })  
    console.log(data2)
    // try {
    //     const dataToSave = await data2.save();
    //     res.send(JSON.stringify({"status": 200, "error": null, "response": "hello"}));
    // }
    // catch (error) {
    //     res.status(400).json({message: error.message})
    // }
    const checkName = await ModelUser.findOne({name: data2.name});
    const checkEmail =  await ModelUser.findOne({email: data2.email});
    if (checkName){
        try {
            res.send(JSON.stringify({"status": 401, "error": null, "response": "tai khoan hoac email ton tai"}));
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
     }
     else if (checkEmail){
        try {
            res.send(JSON.stringify({"status": 402, "error": null, "response": " email ton tai"}));
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
   }
   else {
         try {
            const dataToSave = await data2.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": "hello"}));
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const data = await ModelUser.findOne({name: req.body.name});

    console.log(data);

    if(data){

        const match = await bcrypt.compare(req.body.password , data.password)

        if (match){
            try {
    
                res.send(JSON.stringify({"status": 200, id: data._id ,  "error": null, "response": "SuccessLogin"}));
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
        else {
            res.send(JSON.stringify({"status": 400, "error": null, "response": "tai hoac mat khau sai"}));
        }
       
    }
    else {
        res.send(JSON.stringify({"status": 400, "error": null, "response": "tai hoac mat khau sai"}));
    }
    
})

// get one User by ID
router.get('/getoneuser/:id', async (req, res) => {
    try{
        const user = req.params.id
        const data = await ModelUser.findById({_id: user}, {password: 0});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//get all userS
router.get('/getUser', async (req, res) => {
    try{
        const data = await ModelUser.find({}, {password: 0}).exec();
        res.json(data)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
module.exports = router;

