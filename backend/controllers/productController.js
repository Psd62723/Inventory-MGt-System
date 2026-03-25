const Product=require("../models/Product");

exports.getProducts=async(req,res)=>{
 try{
  const data=await Product.find().sort({createdAt:-1});
  res.json(data);
 }catch{res.status(500).json({msg:"error"});}
};

exports.addProduct=async(req,res)=>{
 try{
  const p=new Product(req.body);
  await p.save();
  res.json(p);
 }catch{res.status(500).json({msg:"error"});}
};

exports.updateProduct=async(req,res)=>{
 try{
  const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.json(p);
 }catch{res.status(500).json({msg:"error"});}
};

exports.deleteProduct=async(req,res)=>{
 try{
  await Product.findByIdAndDelete(req.params.id);
  res.json({msg:"deleted"});
 }catch{res.status(500).json({msg:"error"});}
};

exports.lowStock=async(req,res)=>{
 try{
  const p=await Product.find({$expr:{$lte:["$quantity","$minStock"]}});
  res.json(p);
 }catch{res.status(500).json({msg:"error"});}
};