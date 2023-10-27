import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <div>
            <img className="logo" src="https://cdn.dribbble.com/users/2948332/screenshots/5926397/media/357699e8f3cebb604bc8c2cb172682a9.jpg" alt="Logo" />
                {auth?
                <ul className='nav-ul'><li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                {/* <li><Link to='/update'>Update Product</Link></li> */}
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>LogOut ({JSON.parse(auth).name})</Link></li>
                </ul>
                :<ul className='nav-ul nav-sign'>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>Login</Link></li>
                </ul>
                }
        </div>
    )
}

export default Nav;