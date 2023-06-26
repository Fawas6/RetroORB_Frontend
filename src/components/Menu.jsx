import React from 'react'
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

export default function Menu() {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.classList.add('menu_items');
      }
      else {
        menuRef.current.classList.remove('menu_items');
      }
    }
  }, [isOpen]);

  return (
    <>
     <header>
        <Link to='#' className='toggle_button' onClick={toggleMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
        </Link>
        {isOpen && <nav className='menu_items' ref={menuRef}>
            <ul>
                <li><Link className='nav_link' to='/Dashboard'>Dashboard</Link></li>
                <li><Link className='nav_link' to='/Signup_Form'>Sign Up/Login</Link></li>
            </ul>
        </nav>}
     </header>
    </>
  )
}
