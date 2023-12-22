const Product = require('../models/Product')
// const { verifyTokenandAdmin } = require("./verifytoken")
const router = require('express').Router()
const cryptoJs = require("crypto-js");

// CREATE
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const saveproduct = await newProduct.save();
        res.status(200).json({ sucess: true, saveproduct })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE  
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted..")
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET ALL PRODUCT
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router