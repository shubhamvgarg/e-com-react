import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Products = () => {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        getProducts();
        
    },[])

    const getProducts= async ()=>{
        // const auth = localStorage.getItem('user');
        // const userid = Number(JSON.parse(auth).id);
        let result = await fetch(`http://localhost:5000/products`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setProducts(result)
    }
    const deleteProd= async(id)=>{
        let result = await fetch(`http://localhost:5000/delete/${id}`,{
            method:'delete',
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result) {
            alert('Your product is deleted')
            getProducts();
        }

    }
    const searchHandle= async(e)=>{
      let key = e.target.value;
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json();
        if(result){
          setProducts(result)
        }
      }else{
        getProducts()
      }
      
    }
    

  return (
    <div className='product-list'>
      <h1>All Products Available </h1>
      <input type="text" placeholder='Search Product' onChange={searchHandle} />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Brand</li>
        <li>Actions</li>
      </ul>
    {
        products.length>0 ? products.map((item,index)=>
        <ul key={item.id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>&#8377; {item.price}</li>
        <li>{item.brand}</li>
        <li>
            <button className="delete" onClick={()=>deleteProd(item.id)}  >Delete</button>
            <Link to={`/update/${item.id}`}>Edit</Link>
        </li>
        
      </ul>
        )
        : <h1>No Product Fond for your search</h1>
    }
    </div>
  )
}

export default Products


// http://localhost:5000/products
