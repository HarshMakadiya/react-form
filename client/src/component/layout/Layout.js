import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from '../UI/HeaderNavbar';
import Footer from '../UI/Footer';
import image from '../UI/image.jpg'

const Layout = () => {
  return (
    <>
        <HeaderNavbar/>
            <img src={image} className='responsive' alt="React Logo" />
        <Footer/>
    </>
  )
}

export default Layout