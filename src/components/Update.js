import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const params = useParams();
  
    const navigate = useNavigate();
    
    useEffect(() => {
        getProductDetails()
    }, [])
    
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        result = result[0]
        setName(result.name)
        setPrice(result.price)
        setBrand(result.brand)

    }

    const updateProduct = async () => {


        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, brand }),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        navigate('/')
    }

    return (

        <div className='addProd'>
            <h1>Update Product</h1>
                <input className='inputBox' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Product Name' />
                <input className='inputBox' type="text" onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Enter Price' />
                <input className='inputBox' type="text" onChange={(e) => setBrand(e.target.value)} value={brand} placeholder='Enter Brand' />
                <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>

    )
}

export default Update
