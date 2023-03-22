import React, { useContext } from 'react'
import Header from '../components/Header'
import { GlobalContext } from "../context/GlobalState";
import Movie from '../components/Movie';
import Spinner from '../components/Spinner';


const Movies = () => {
  const { movies, movieCategories, isLoading } = useContext(GlobalContext);



  return (
    <div>
      <Header></Header>

      {isLoading && <Spinner />}

      {!isLoading && <div className='movie-container'>
        {movies.map(movie => (
          <Movie movie={movie} />
        ))}
      </div>}
    </div>
  )
}

export default Movies