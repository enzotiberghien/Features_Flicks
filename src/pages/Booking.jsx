import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from "../context/GlobalState";
import Seat from '../components/Seat';
import Header from '../components/Header'
import Spinner from '../components/Spinner';

const Booking = () => {
  const { movies, screenings, occupiedSeats, isLoading } = useContext(GlobalContext);
  const { id } = useParams();

  const screening = screenings.find(screening => screening.id === parseInt(id));
  const movie = movies.find(movie => movie.id === screening.movieId);

  const date = screening?.time.slice(0, 10)
  const hour = screening?.time.slice(11, 13)

  const occSeatsObj = occupiedSeats.find(x => x.movie === movie.title)
  const totalSeats = occSeatsObj?.total
  const occSeats = occSeatsObj?.occupiedSeats.replace(/\s/g, "").split(",")

  const [seats, setSeats] = useState([])
  const [visitors, setVisitors] = useState([
    { name: "Visitor", id: 1, age: 18, price: 110, seatId: null }
  ])


  const [currentVisitor, setCurrentVisitor] = useState(0)

  const [receipt, setReceipt] = useState(false)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    if (currentVisitor === visitors.length) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }, [visitors])

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
    setVisitors([...visitors, { name: "Visitor", id: newId, age: 18, price: 110, seatId: null }])
  }

  const toggleModal = () => {
    // document.querySelector("body").className = "modal-open"
  }

  const book = () => {
    const seatsChoosen = visitors.every(e => e.seatId !== null)
    if (seatsChoosen) {
      console.log(visitors)
      setReceipt(true)
      toggleModal()
    }
  }


  const onChangeAge = (index, event) => {
    const age = parseInt(event.target.value)
    const newVisitors = [...visitors]
    const price = age >= 65 ? 85 : (age < 12 ? 75 : 110)
    newVisitors[index] = { ...newVisitors[index], age, price }
    setVisitors(newVisitors)
  }

  // Total price
  const sum = visitors.reduce((acc, visitor) => acc + visitor.price, 0)
  useEffect(() => setTotalAmount(sum), [sum])
  const [totalAmount, setTotalAmount] = useState(sum)

  // Booking numbers
  function generateBookingNumber() {
    let no = '';
    while (no.length < 3) {
      no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
    }
    while (no.length < 6) {
      no += Math.floor(Math.random() * 10);
    }
    return no;
  }
  

  return (
    <div className='booking-container'>
      <Header></Header>
      {isLoading && <Spinner />}

      {!isLoading && <div className='booking-card'>
        <img src={"https://cinema-rest.nodehill.se/" + movie?.description.posterImage} alt="" />
        <div className='booking-card-text'>
          <div className='booking-card-title'>{movie?.title}</div>
          <div className='booking-card-date'>{date}</div>
          <div className='booking-card-hour'>{hour}:00</div>
          <div className='booking-card-room'>{screening?.auditoriumId === 1 ? "Big" : "Small"} auditorium</div>
        </div>
      </div>}

      {!isLoading && <div className='visitors'>
        {visitors.map((visitor, index) => (
          <div key={visitor.id} className='visitor'>
            <div>{visitor.name} {visitor.id}</div>
            <input min="3" onChange={(event) => onChangeAge(index, event)} type="number" placeholder='Age' />
            <div>seat: {visitor.seatId === null ? "?" : visitor.seatId}</div>
            <div>price: {visitor.price} SEK</div>
          </div>
        ))}
        <div className='total-container'>
          <div className='total-text'>Total:</div>
          <div>{totalAmount} SEK</div>
        </div>
        <div className='btn-container'>
          <button onClick={addVisitor}>Add visitor</button>
        </div>
      </div>}

      {!isLoading && <div className="cinema-container">
        {!(currentVisitor === visitors.length) &&
          <div className="choose">Visitor {currentVisitor + 1} please choose a seat</div>
        }
        {(currentVisitor === visitors.length) &&
          <div className="choose">Seats Choosen !</div>
        }

        <div className="seatsContainer">
          {[...seats].reverse().map((e, i) => (
            <>
              <Seat currentVisitor={currentVisitor} visitors={visitors} seatObj={e} onSelectSeat={handleSeatClick} />
              {((i % 11) === 0 && (i >= 1)) && <div className='break' />}
            </>
          ))}
        </div>

        <div className='screen'></div>
      </div>}


      {!isLoading && <button className='booking-btn' onClick={book}>Book</button>}

      {receipt && (<div className='overlay' onClick={() => setReceipt(null)}>
        <div className='receipt'>
          <div className='modal'>
            <img src={"https://cinema-rest.nodehill.se/" + movie?.description.posterImage} alt="" />
            <div className='modal-text'>
              <div className='modal-title'>{movie?.title}</div>
              <div className='modal-date'>{date}</div>
              <div className='modal-hour'>{hour}:00</div>
              <div className='modal-room'>{screening?.auditoriumId === 1 ? "Big" : "Small"} auditorium</div>
              <div className='modal-number'>Booking Number: {generateBookingNumber()}</div>
            </div>
          </div>
          <div className='receipt-visitors'>
            {visitors.map((visitor, index) => (
              <div key={visitor.id} className='visitor'>
                <div>{visitor.name} {visitor.id}</div>
                <div className="age">{visitor.age}</div>
                <div>seat: {visitor.seatId === null ? "?" : visitor.seatId}</div>
                <div>price: {visitor.price} SEK</div>
              </div>
            ))}
            <div className='total-container'>
              <div className='total-text'>Total:</div>
              <div className='receipt-total'>{totalAmount} SEK</div>
            </div>
          </div>
        </div>
      </div>)}
    </div>

  )
}

export default Booking