import { getTable } from '../utils/fetchAPI'
import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from 'react-router-dom';


const ScreeningMovie = ({ screening }) => {
  const { movies } = useContext(GlobalContext);

  const movie = movies.find(movie => movie.id === screening.movieId);
  const navigate = useNavigate();



  const timeConvert = (n) => {
    const [hours, minutes] = [Math.floor(n / 60), Math.round(n % 60)];
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };


  const onClick = () => {
    navigate(`/booking/${screening.id}`)
  }
  

  return (
    <div>
      <li>
        <div>
          <img src={"https://cinema-rest.nodehill.se/" + movie.description.posterImage} alt="" />
        </div>
        <div className='movie-desc'>
          <div>{movie.title} | {timeConvert(movie.description.length)}</div>
          <div>{movie.description.categories.join(", ")}</div>
          <div>{screening.auditoriumId === 1 ? "Big" : "Small"} auditorium</div>
          <button onClick={onClick}>Book</button>
        </div>
      </li>
    </div>
  )
}

export default ScreeningMovie