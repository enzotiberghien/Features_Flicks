import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="main-header">
    <div className="logo">
      <a href="/">
        <img src="../src/imgs/logo.png"  />
      </a>
    </div>
    <nav className="desktop-main-menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/movies">Movies</a></li>
        <li><a href="/screenings">Screenings</a></li>
      </ul>
    </nav>
  </header>
    </div>
  )
}

export default Header