import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const SignUp = () => {

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();

    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    const handleData = async ()=>{
      if(name===''||email===''||password===''){
        alert('Fill form to sing up')
      }
      else{

        let result = await fetch('http://localhost:5000/register',{
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result = await result.json();
        localStorage.setItem('user',JSON.stringify(result.user))
        localStorage.setItem('auth',JSON.stringify(result.auth))
        navigate('/')
      }
      
    }
  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
      <input className='inputBox' value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter Email' />
      <input className='inputBox' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter Pasword' />
      <button className='appButton' onClick={handleData} type='button'>Sign Up</button>
    </div>
  )
}

export default SignUp
