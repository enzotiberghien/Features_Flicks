import React from 'react'

const Movie = ({movie}) => {
  return (
      <div className='movie'>
        <img src={"https://cinema-rest.nodehill.se/" + movie.description.posterImage} alt={movie.path} />
        <div className='movie-brand'>
          <div className='movie-title'>{movie.title}</div>
        </div>
      </div>
  )
}

export default Movie