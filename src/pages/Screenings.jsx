import { getTable } from '../utils/fetchAPI'
import React, { useEffect, useState, useContext } from 'react'
import ScreeningDay from '../components/ScreeningDay'
import { GlobalContext } from "../context/GlobalState";
import Header from '../components/Header';
import Spinner from '../components/Spinner';



const Screenings = () => {
  const { screenings, movies, movieCategories, isLoading } = useContext(GlobalContext);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dateRange, setDateRange] = useState([0, 5])
  const pagesBtns = ["Previous", "Next"]

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
      <Header></Header>
      {isLoading && <Spinner />}

      <div id='screenings'>
        {!isLoading && <div id='filters'>
          <input type="date" onChange={e => setSelectedDate(e.target.value)} />
          <select name="category" id="category" onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">All categories</option>
            {movieCategories.map(movieCat => (
              <option key={movieCat.title} value={movieCat.title}>{movieCat.title}</option>
            ))}
          </select>
        </div>}

        {selectedDate && day()[selectedDate] && !isLoading && (
          <ScreeningDay day={day()} date={selectedDate} />
        )}

        {selectedDate && !day()[selectedDate] && !isLoading && (
          <div className='filler'>No Screening Found</div>
        )}

        {!selectedDate && !isLoading && Object.keys(day()).map((date, i) => {
          if (i < dateRange[1] && i >= dateRange[0]) {
            return (<ScreeningDay day={day()} date={date} />)
          }
        })}



        <div className='pagination-btns'>
          {!isLoading && pagesBtns.map(e => (
            <button className='pagination-btn' onClick={() => {
              if (dateRange[0] === 0 && e === "Previous") return;
              else if (dateRange[1] >= Object.keys(day()).length && e === "Next") return;
              else if (e === "Previous") setDateRange([dateRange[0] - 5, dateRange[1] - 5]);
              else setDateRange([dateRange[0] + 5, dateRange[1] + 5]);
            }}>
              {e}
            </button>

          ))}
        </div>

      </div>
    </div>
  )
}

export default Screenings
