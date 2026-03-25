import React,{useEffect,useState} from "react";
import {getProducts,addProduct,updateProduct,deleteProduct} from "../services/api";

export default function Dashboard(){
 const [products,setProducts]=useState([]);
 const [form,setForm]=useState({name:"",category:"",price:"",quantity:"",minStock:""});
 const [edit,setEdit]=useState(null);
 const [search,setSearch]=useState("");

 const fetch=async()=>{const r=await getProducts();setProducts(r.data);};
 useEffect(()=>{fetch();},[]);

 const submit=async()=>{
  if(edit){await updateProduct(edit._id,form);setEdit(null);}
  else await addProduct(form);
  fetch();
 };

 const filtered=products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));

 return(
  <div style={{padding:20}}>
   <h2>Inventory Dashboard</h2>

   <input placeholder="search" onChange={e=>setSearch(e.target.value)} />

   <div>
    <input placeholder="name" onChange={e=>setForm({...form,name:e.target.value})}/>
    <input placeholder="category" onChange={e=>setForm({...form,category:e.target.value})}/>
    <input placeholder="price" onChange={e=>setForm({...form,price:e.target.value})}/>
    <input placeholder="qty" onChange={e=>setForm({...form,quantity:e.target.value})}/>
    <input placeholder="min" onChange={e=>setForm({...form,minStock:e.target.value})}/>
    <button onClick={submit}>{edit?"Update":"Add"}</button>
   </div>

   {filtered.map(p=>(
    <div key={p._id} style={{border:"1px solid #ccc",margin:10,padding:10}}>
     <h3>{p.name}</h3>
     <p>{p.category}</p>
     <p>{p.quantity}</p>
     {p.quantity<=p.minStock && <span style={{color:"red"}}>Low</span>}
     <button onClick={()=>{setEdit(p);setForm(p)}}>Edit</button>
     <button onClick={()=>{deleteProduct(p._id);fetch();}}>Delete</button>
    </div>
   ))}
  </div>
 );
}
