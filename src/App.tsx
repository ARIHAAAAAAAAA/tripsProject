import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import UserLogin from './Components/UserLogin';
import AllTrips from './Components/AllTrips';
import UserRegistration from './Components/UserRegistration';
import NewTripForm from './Components/NewTripForm';
import TripDetail from './Components/TripDetail';
import UpdateTripForm from './Components/UpdateTripForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/trips" element={<AllTrips />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path='/newTrip' element={<NewTripForm />} />
          <Route path='/TripDetail/:id' element={<TripDetail />} />
          <Route path='/upDate/:id' element={<UpdateTripForm/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
