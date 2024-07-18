const express =require("express");
const app = express();
require('dotenv').config();
 const dbconnection=require('./config/dbconfig')
 dbconnection.dbconfig()
const userRoutes=require('../backend/Routes/Userroute')
const cors = require('cors')
const adminRoutes =require('./Routes/Adminroute')



app.use(express.json());
app.use(cors())
app.use("/",userRoutes)
app.use("/admin",adminRoutes)
 






app.listen(process.env.PORT,() =>{
    console.log(`server is running on ${process.env.PORT}`);
});

// module.exports = router;
