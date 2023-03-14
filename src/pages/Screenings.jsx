import { getTable } from '../utils/fetchAPI'
import React, { useEffect, useState, useContext } from 'react'
import ScreeningDay from '../components/ScreeningDay'
import { GlobalContext } from "../context/GlobalState";



const Screenings = () => {
  const { screenings, movies, movieCategories } = useContext(GlobalContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const day = () => {
    const groups = {}
    screenings.forEach(screening => {
      const date = screening.time.slice(0, 10)
      const hour = screening.time.slice(11, 13)
      const movie = movies.find(movie => movie.id === screening.movieId)
      if (selectedCategory && movie && !movie.description.categories.includes(selectedCategory)) {
        // If a category is selected and the movie doesn't match, skip this screening
        return
      }
      if (!groups[date]) {
        groups[date] = {}
      }
      if (!groups[date][hour]) {
        groups[date][hour] = []
      }
      groups[date][hour].push(screening)
    })

    // Remove days that have no screenings after filtering by category
    Object.keys(groups).forEach(date => {
      if (!Object.values(groups[date]).flat().length) {
        delete groups[date]
      }
    })

    return groups
  }


  return (
    <div>
      <input type="date" onChange={e => setSelectedDate(e.target.value)} />
      <select name="category" id="category" onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">All categories</option>
        {movieCategories.map(movieCat => (
          <option key={movieCat.title} value={movieCat.title}>{movieCat.title}</option>
        ))}
      </select>

      {selectedDate && day()[selectedDate] && (
        <ScreeningDay day={day()} date={selectedDate} />
      )}

      {!selectedDate && Object.keys(day()).map(date => (
        <ScreeningDay key={date} day={day()} date={date} />
      ))}

    </div>
  )
}

export default Screenings
