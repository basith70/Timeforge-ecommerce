const express = require('express');
const { userList,productadd } = require('../Controllers/Admincontroller');
const router = express.Router();
const upload = require('../Middleware/Multer');
router.get("/users", userList);

module.exports = router;
router.post('/productadd',upload.single('imageFile'), productadd);




module.exports = router;