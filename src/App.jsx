import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Movies from "./pages/Movies"
import Welcome from "./pages/Welcome"
import Screenings from "./pages/Screenings"
import Booking from "./pages/Booking"
import { GlobalProvider } from "./context/GlobalState"
import "./style.css"


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/screenings" element={<Screenings />}></Route>
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </Router>
    </GlobalProvider>
  )
}

export default App
