import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from "../context/GlobalState";
import Seat from '../components/Seat';


const Booking = () => {
  const { movies, screenings, occupiedSeats } = useContext(GlobalContext);
  let { id } = useParams();
  const screening = screenings.find(screening => screening.id === parseInt(id));
  const movie = movies.find(movie => movie.id === screening.movieId);
  const date = screening?.time.slice(0, 10)
  const hour = screening?.time.slice(11, 13)


  let occSeatsObj = occupiedSeats.find(x => x.movie === movie.title)
  const totalSeats = occSeatsObj?.total
  const occSeats = occSeatsObj?.occupiedSeats.replace(/\s/g, "").split(",")


  const [seats, setSeats] = useState([])

  useEffect(() => {
    const seatsArr = []
    for (let i = 1; i <= totalSeats; i++) {
      let seat = {
        id: i,
        occupied: occSeats.includes(i.toString())
      }
      seatsArr.push(seat)
    }
    setSeats(seatsArr)
  }, [occupiedSeats])


  const [visitors, setVisitors] = useState([
    { name: "Visitor", id: 1, age: 18, price: 360, seatId: null }
  ])

  const [currentVisitor, setCurrentVisitor] = useState(0)

  const handleSeatClick = (seatId) => {
    if (currentVisitor <= visitors.length) {
      const newVisitors = [...visitors]
      newVisitors[currentVisitor].seatId = seatId
      setVisitors(newVisitors)
      setCurrentVisitor(currentVisitor + 1)
      console.log(visitors)
    }
  }


  const addVisitor = () => {
    const newId = visitors[visitors.length - 1].id + 1
    console.log(newId)
    setVisitors([...visitors, { name: "Visitor", id: newId, age: 18, price: 360, seatId: null }])
  }


  const book = () => {
    return (
      <div>HEEEEEEY</div>
    )
  }


  return (
    <div>
      <div>{movie?.title}</div>
      <div>{date}</div>
      <div>{hour}:00</div>
      <div>{screening?.auditoriumId === 1 ? "Big" : "Small"} auditorium</div>
      <br />
      <div className='visitors'>
        {visitors.map(visitor => (
          <div key={visitor.id} className='visitor'>
            <div>{visitor.name} {visitor.id}</div>
            <input type="number" placeholder='Age' />
            <div>price: {visitor.price}</div>
          </div>
        ))}

      </div>
      <button onClick={addVisitor}>Add visitor</button>
      <br />
      <br />
      <div className={(currentVisitor === visitors.length) ? "invisible" : ""}>Visitor {currentVisitor + 1} please choose a seat</div>
      <div className={(currentVisitor === visitors.length) ? "invisible" : "seatsContainer"}>
        {seats.map(e => (
          <Seat key={e.id} seatObj={e} onSelectSeat={handleSeatClick} />
        ))}
      </div>
      <button onClick={book}>Book</button>
    </div>

  )
}

export default Booking