import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [error, setError] = useState(false)
    const navigate = useNavigate();


    const handleAddProd = async () => {

       
        if (!name || !price || !brand) {
            setError(true)
            return false;
        }

        const auth = localStorage.getItem('user');
        const userid = Number(JSON.parse(auth).id);
        

        let result = await fetch('http://localhost:5000/addproduct', {
            method: 'post',
            body: JSON.stringify({ name, brand, price, userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        navigate('/add')
    }

    return (
        <div className='addProd'>
            <h1>Add Product</h1>
            <input className='inputBox' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Product Name' />
            {
                error && !name && <span className='invalid-inp'>Enter valid Product Name</span>
            }

            <input className='inputBox' type="text" onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Enter Price' />
            {
                error && !price && <span className='invalid-inp'>Enter valid Price</span>
            }
            <input className='inputBox' type="text" onChange={(e) => setBrand(e.target.value)} value={brand} placeholder='Enter Brand' />
            {
                error && !brand && <span className='invalid-inp'>Enter valid Brand</span>
            }
            <button onClick={handleAddProd} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct
