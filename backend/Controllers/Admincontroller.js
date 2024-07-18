const Usermodel = require('../Model/Usermodel');
const Product = require('../Model/productaddmodels')

module.exports.userList = async (req, res) => {
  console.log("from userlist")
  try {
    const userlist = await Usermodel.find();
    if (userlist) {
      return res.json({ status: true, userlist });
    } else {
      return res.json({ status: false, message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Error fetching users" });
  }
};
module.exports.productadd = async (req, res) => {
  try {
    const { productName, description, price, category } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image file is required", success: false });
    }

    const newProduct = new Product({
      productName,
      description,
      price: parseFloat(price.slice(1)),
      category,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newProduct.save();

    return res.json({ message: "Product added successfully", success: true });
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(500)
      .json({ message: "An error occurred", success: false });
  }
};
