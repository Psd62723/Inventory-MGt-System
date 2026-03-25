const r=require("express").Router();
const c=require("../controllers/productController");
r.get("/",c.getProducts);
r.post("/",c.addProduct);
r.put("/:id",c.updateProduct);
r.delete("/:id",c.deleteProduct);
r.get("/low-stock",c.lowStock);
module.exports=r;