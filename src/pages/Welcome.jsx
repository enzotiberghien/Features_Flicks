import React from 'react'
import Header from '../components/Header'

const Welcome = () => {
  return (
    <div>
      <Header></Header>
      <div id='welcome-container'>
        <div>
          <div id='welcome-text'>
            <h1>Welcome to <span className='span-orange'>Features Flicks</span></h1>
            <p>
              Discover the enchantment of the silver screen with our cutting-edge cinemas. Whether you're here for date night or family fun, our unforgettable cinematic experience will transport you to a world of movie magic.           </p>
            <a href="/screenings"><button className='btn'>Book Tickets</button></a>
          </div>
        </div>
        <img src="../src/imgs/515.jpg" alt="" />
      </div>
    </div>
  )
}

export default Welcome