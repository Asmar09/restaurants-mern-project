const Product = require("../models/Product");

exports.create = async (req, res) => {

       console.log(req.body);
       console.log(req.file);

       const {filename} = req.file
       const {productName, productPrice, productDesc , productCategory, productQty } = req.body

  try {

      let product = new Product()
      product.fileName = filename
      product.productName = productName
      product.productPrice = productPrice
      product.productDesc = productDesc
      product.productCategory = productCategory
      product.productQty = productQty

         await product.save()
            res.status(200).json({
                successMessage: `${productName} was created`
            })
  } catch (error) {
    console.log("Error when creating category", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};
