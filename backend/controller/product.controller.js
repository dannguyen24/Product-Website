import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {
        try {
                //Fetch all the products that we have in the database
                const products = await Product.find({});
                res.status(200).json({success: true, data: products});
        } catch (error) {
                console.log("Erro: ", error.message);
                res.status(500).json({success: false, message: "get product failed"});
        }
}

export const createProduct = async (req, res) => {
        //Get the content from the user
        const product = req.body;
        
        //Validate if the response is missing
        if (!product.name || !product.price || !product.image) {
                return res.status(400).json({success: false, message: "please provide all fields"});
        }
        
        //Create a product model from product.model.js
        const newProduct = new Product(product);

        try {
                //Save the newProduct to MongoDB
                await newProduct.save();
                return res.status(201).json({success: true, data: newProduct});
        } catch (error) {
                console.log("Error in creating product", error.message);
                return res.status(500).json({success: false, message: "Create product fail"});
        }
        res.send("Server is ready");
}; 

export const updatedProduct =  async (req, res) => {
        const {id} = req.params;
        const product = req.body;
        //Check if the ID is not in the database
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({success: false, message: "ID not found"});
        }
        try {
                const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
                return res.status(200).json({success: true, data: updatedProduct});
        } catch (error) {
                console.log("Error: ", error);
                return res.status(500).json({success: true, message: "Server failed"});
        }
};

export const deleteProduct = async(req, res)=> {
        //Get the id from the URL
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({success: false, message: "ID not found"});
        }
        try {
                 await Product.findByIdAndDelete(id);
                 res.status(200).json({success: true, message: "delete success"});
        } catch (error) {
                 console.log("Error: ", error.message);
                 res.status(500).json({success: false, message: "Server error"});
        }
};