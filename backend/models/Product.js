const mongoose=require("mongoose");
module.exports=mongoose.model("Product",new mongoose.Schema({
 name:String,category:String,price:Number,quantity:Number,minStock:Number,
 createdAt:{type:Date,default:Date.now}
}));