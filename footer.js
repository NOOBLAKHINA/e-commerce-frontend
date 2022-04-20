import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './footer.css'
const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>Download our App</h4>
        <p>Download app for android and Ios mobile phones</p>
        <img src={playStore } alt ='playStore'/>
        <img src={appStore } alt ='appStore'/>
      </div>
      <div className='midFooter'>
        <h1>Ecommerce</h1>
        <p>high quality is our first priority</p>
        <p>Copyrights 2021 &copy; GauravLakhina</p>

      </div>
      <div className='rightFooter'>
        <h4>Follow us</h4>
        <a href='www.instagram.com'>Instagram</a>
        <a href='www.instagram.com'>Facebook</a>
        <a href='www.instagram.com'>Snapchat</a>
      </div>
    </footer>
    
  )
}

export default Footer
