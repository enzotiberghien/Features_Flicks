import React, { createContext, useEffect, useState } from "react";
import { getTable } from '../utils/fetchAPI'

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    movies: [],
    screenings: [],
    movieCategories: [],
    occupiedSeats: [],
  });

  useEffect(() => {
    (async () => {
      const movies = await getTable("movies");
      const screenings = await getTable("screenings");
      const movieCategories = await getTable("categories");
      const occupiedSeats = await getTable("occupied_seats");

      setState({ movies, screenings, movieCategories, occupiedSeats });
    })();
  }, []);

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
