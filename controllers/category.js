const Category = require("../models/Category");

exports.create = async (req, res) => {
  const { category } = req.body;

  try {
    const existCategory = await Category.findOne({category})
     if(existCategory){
      res.status(400).json({
        errorMessage: `${category} already exist`,
      });
     }
      let newCategory = new Category()
         newCategory.category = category

         newCategory = await newCategory.save()
            res.status(200).json({
                successMessage: `${newCategory.category} was created`
            })
  } catch (error) {
    console.log("Error when creating category", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};


exports.readAll = async (req, res) => {

  try {
      const categories = await Category.find({})

      res.status(200).json({
        categories,
      })
  } catch (error) {
    console.log("Error when fetching category data ", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};