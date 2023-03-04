import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import '../css/Footer.css'
function Footer() {
  return (
    <div className='footer-container'>
      
      {/* section for adding contact box */}
        {/* <section className = 'footer-subscription'>
            <p className='footer-subscription-heading'>
                Join the newsletter for up to date information
            </p>
            <p className='footer-subscription-text'>
                unsubscribe at any time
            </p>
            <div className='input-areas'>
            <form>
                <input type = 'email' name = 'email' placeholder =" Your Email"  className='footer-input'/>
                <Button buttonStyle='btn--outline'>Contact</Button>
            </form>
            </div>
        </section> */}
        <div className='footer-links'>
        <div className='footer-links-wrapper'>
        <div className='footer-links-items'>
        
        </div></div></div>

        <section className='social-media'>
        <div className='social-media-wrap'>
        <div className='footer-logo'>
            <Link to = '/'className='social-logo'>
            <i className="fa-solid fa-angle-left"></i>
            <i className="fa-solid fa-angle-right"></i>
            &nbsp;Care Bridge &nbsp;
            <i className='fa-solid fa-code' />
            </Link>
        </div>
        <small className='website-rights'> CareBridge © 2023 </small>
        <div className='social-icons'>
            <a className='social-icon-link linkedin'
            target ='_blank'
            href= 'https://www.epic.com/'

            aria-label = 'LinkedIn'
            >
             More on the EPIC EMR system <i className="fa-brands fa-linkedin-in" />
            </a>
        </div>
   
        </div>

        </section>
    </div>

  )
}

export default Footer