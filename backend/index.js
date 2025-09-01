const cors=require("cors");
const express=require("express");
const app=express();
const productRoute=require("./route/productroute");
const sequelize=require("./model/database")
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use("/product",productRoute);
const port=4000;
sequelize.sync();
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
