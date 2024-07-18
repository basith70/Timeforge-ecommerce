const jwt = require('jsonwebtoken');
const usermodel = require("../Model/Usermodel");
const bcrypt = require("bcrypt");
const secretKey = "your_secret_key";

module.exports.signup = async (req, res) => {
    try {
        const { username, Emailaddress, Password, Phonenumber } = req.body;
        
        console.log(req.body); // Log request body for debugging

        const emailExist = await usermodel.findOne({ Emailaddress: Emailaddress });
        if (emailExist) {
            return res.json({ message: "Email already exists", status: false });
        }

        const newUser = new usermodel({
            username: username,
            Emailaddress: Emailaddress,
            Password: Password,
            Phonenumber: Phonenumber,
        });

        const userDetails = await newUser.save();

        return res.json({
            message: "Account created successfully",
            status: true,
        });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server error in sign up", status: false });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const customer = await usermodel.findOne({ username });

        if (customer) {
            // Compare hashed password from database with plain text password
            const match = await bcrypt.compare(password, customer.Password);
            
            if (match) {
                const token = jwt.sign({ id: customer._id }, secretKey, { expiresIn: '1h' });
                return res.json({ 
                    message: "Login successful", 
                    success: true, 
                    token, 
                    username: customer.username, 
                    Emailaddress: customer.Emailaddress, 
                    Phonenumber: customer.Phonenumber, 
                });
            } else {
                return res.json({ message: "Incorrect password", success: false });
            }
        } else {
            return res.json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "An error occurred", success: false });
    }
};
module.exports.products = async (req, res) => {
    try {
      const products = await productaddModel.find();
      if (products) {
        res.json({ status: true, products });
      } else {
        res.json({ status: false, message: "No products found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  };