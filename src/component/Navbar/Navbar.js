import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { UserContext } from '../../App';


const Navbar = () => {
const [logInUser,setLogInUser] = useContext(UserContext)
    return (
      <>
        <nav className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand" to="/home">Travel Manager</Link>
    <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse ms-auto" id="navbarNavDropdown">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/destination/Car">Destination</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
       {logInUser.email && <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           {logInUser.name || logInUser.email }
          </Link>
          <ul className="dropdown-menu modify-dropdown-menu text-center" style={{background:'white',color:'black'}} aria-labelledby="navbarDropdownMenuLink">
            <li><img src={logInUser.photo || 'https://i.ibb.co/3Mz8csz/man-303792-960-720.png'} style={{width:'50px',height:'50px',borderRadius: '50%',marginTop:'5px'}} alt=""/></li>
            <li><Link className="dropdown-item btn btn-primary" to="/profile">View Profile</Link></li>
          </ul>
        </li>}
        <li className="nav-item">
          {logInUser.email ? <Link onClick={() =>{setLogInUser({})}} style={{background:'#212529',padding:"8px 25px"}}className="nav-link btn" to="/">Logout</Link> :<Link style={{background:'#212529',padding:"8px 25px"}}className="nav-link btn" to="/login">Login</Link> }
        </li>

      </ul>
    </div>
  </div>
</nav>

      </>
      );
};

export default Navbar;