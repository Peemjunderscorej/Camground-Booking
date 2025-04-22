import {BrowserRouter as Router, Routes, Route} from
'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CampgroundsPage from './pages/Campgrounds'
import CampgroundPage from './pages/Campground'
import BookingsPage from './pages/Bookings'
import CompleteProfile from './pages/complete-profile'
function App() {
return (
<>
<div className="container">
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/campgrounds' element={<CampgroundsPage />} />
    <Route path='/campgrounds/:id' element={<CampgroundPage />} />
    <Route path='/bookings' element={<BookingsPage />} />
    <Route path='/complete-profile' element={<CompleteProfile />} />
  </Routes>
</div>
<ToastContainer />
</>
);
}
export default App;