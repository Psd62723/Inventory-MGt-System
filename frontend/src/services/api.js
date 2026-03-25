import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000/products"});
export const getProducts=()=>API.get("/");
export const addProduct=(d)=>API.post("/",d);
export const updateProduct=(id,d)=>API.put(`/${id}`,d);
export const deleteProduct=(id)=>API.delete(`/${id}`);
