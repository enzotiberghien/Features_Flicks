import React, { useState } from 'react'

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
    console.log(showNavbar)
  }

  return (
    <div>
      <header className="main-header">
        <div className="logo">
          <a href="/">
            <img src="../src/imgs/logo.png" />
          </a>
        </div>
        <img className='hamburger' onClick={handleShowNavbar} src="https://w7.pngwing.com/pngs/626/110/png-transparent-black-logo-computer-icons-hamburger-button-menu-new-menu-angle-text-rectangle.png" alt="" />
        <nav className="desktop-main-menu">
          <ul className={`inactive ${showNavbar ? "active": ""}`}>
            <li className='nav-link'><a href="/">Home</a></li>
            <li className='nav-link'><a href="/movies">Movies</a></li>
            <li className='nav-link'><a href="/screenings">Screenings</a></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header