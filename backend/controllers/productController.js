const Product = require("../models/productModels")


// create new product -- admin 
exports.createProduct = async (req ,res , next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success : true,
        product
    })

}


//get all products
exports.getAllProducts =  async (req,res) => {
    const product = await Product.find();
    res.status(200).json({
        success : true,
        product
    })
}

//update product -- admin

exports.updateProduct = async (req ,res , next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success : false,
            message: "product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success : true,
        product
    })
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};