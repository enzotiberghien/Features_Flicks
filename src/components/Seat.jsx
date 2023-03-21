import React, { useState } from 'react'

const Seat = ({ seatObj, onSelectSeat, visitors, currentVisitor }) => {
  const [color, setColor] = useState(seatObj.occupied)


  const onClick = () => {
    if (currentVisitor === visitors.length) {
      return 
    }
    
    if (color === false) {
      seatObj.occupied = !seatObj.occupied
      setColor(!color);
      onSelectSeat(seatObj.id)
      console.log(seatObj)
    }
    console.log(`Seat number ${seatObj.id} is clicked !`);
  }


  return (
    <div onClick={onClick} className={color ? "occupied" : "seats"}>{seatObj.id}</div>
  )
}

export default Seat