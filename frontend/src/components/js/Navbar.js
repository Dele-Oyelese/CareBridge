import React, { useState, useEffect } from "react";
// import { Button } from './Button';
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { Button } from "@mui/material";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i className='fa-solid fa-angle-left'></i>
            <i className='fa-solid fa-angle-right'></i>
            &nbsp;Care Bridge &nbsp;
            <i className='fa-solid fa-code' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/summary'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Execuitve Summary
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/updates'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Patient Updates
              </Link>
            </li>

            {/* <li>
              <Link
                to='/contact'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Contact Me
              </Link>
            </li> */}
          </ul>
          {button && (
            <Button
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
              }}
              variant='outlined'
              component={Link}
              to='/aboutMe'
              buttonStyle='btn--outline'
            >
              LogOut
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
