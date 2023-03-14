import React, { useContext } from 'react'
import ScreeningMovie from './ScreeningMovie'
import { GlobalContext } from "../context/GlobalState";


const ScreeningDay = ({ day, date }) => {
  
  const { movies, selectedCategory } = useContext(GlobalContext);

  const filteredMovies = movies.filter(movie => !selectedCategory || movie.description.categories.includes(selectedCategory));

  return (
    <div>
      <div>
        <h3>{date}</h3>
        {Object.keys(day[date]).map(hour => (
          <div key={hour}>
            <h4>{hour}:00</h4>
            <ul>
              {day[date][hour].map(screening => {
                const movie = filteredMovies.find(movie => movie.id === screening.movieId);
                if (!movie) {
                  // Skip screenings that don't match the selected category
                  return null;
                }
                return <ScreeningMovie key={screening.id} screening={screening} movie={movie}></ScreeningMovie>
              })}
            </ul>
          </div>
        ))}

      </div>

    </div>
  )
}


export default ScreeningDay