const Product = require("../models/Product");
const fs = require('fs');

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

exports.read = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {
	const productId = req.params.productId;

	req.body.fileName = req.file.filename;

	const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

	fs.unlink(`uploads/${oldProduct.fileName}`, err => {
		if (err) throw err;
		console.log('Image successfully deleted from the filesystem');
	});

	res.json({
		successMessage: 'Product successfully updated',
	});
};


exports.delete = async (req, res) => {

  try {
    const productId = req.params.productId
    const deleteProduct = await Product.findByIdAndDelete(productId)

    fs.unlink(`uploads/${deleteProduct.fileName}` , (err) =>{
      if(err) throw err;
    console.log("When while delete images" , deleteProduct.fileName);
    res.json(deleteProduct)
    })
  } catch (error) {
  console.log("Error when delete product", error);
  res.status(500).json({
   errorMessage: "Please try later",
  });
  }
  };