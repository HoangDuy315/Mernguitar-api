const express = require('express');
const router = express.Router()
const ModelProduct = require("../models/productSchema")
router.post('/addproduct', async(req, res) => {
    console.log(req.body)
    const data = new ModelProduct({
        name: req.body.name,
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        imgUrl: req.body.imgUrl,
        pro: []
    })

    try {
        const dataSave = await data.save()
        res.json({status: 200, message: "Product saved successfully"})
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get('/getproduct', async(req, res) => {
    try {
        const data = await ModelProduct.find()
        res.json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
module.exports = router


