const Product = require("../models/Product");

exports.create = async (req, res) => {
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
                successMessage: `${productName} was created`,
                product
            })
  } catch (error) {
    console.log("Error when creating product", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};


exports.readAll = async (req, res) => {

try {
  const products = await Product.find({}).populate('productCategory' , 'category')

  res.json({products})
} catch (error) {
console.log("Error when fetching product", error);
res.status(500).json({
 errorMessage: "Please try later",
});
}
};