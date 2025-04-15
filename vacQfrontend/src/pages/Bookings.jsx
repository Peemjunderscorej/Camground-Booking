
import { useState, useEffect } from 'react';
import BookingList from '../components/BookingList';
import { bookingAPI } from '../components/api/BookingAPI';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');

 


  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      try {
        const data = await bookingAPI.get(currentPage, token);
        if (currentPage === 1) {
            setBookings(data);
        } else {
            setBookings((bookings) => [...bookings, ...data]);
        }
        console.log('bookings is ...', data)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        
        setLoading(false);
      }
    }
    loadBookings();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveBooking = async(booking) => {
    setLoading(true)
    const prevBookings = bookings
    const updatedBookings = bookings.map((c) => {
      return c._id === booking._id ? booking : c;
    });
    setBookings(updatedBookings);

    try{
      await bookingAPI.put(token,booking)
    }catch(error){
      console.log(error)
      setBookings(prevBookings)
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async(id) => {
    setLoading(true)
    const prevBookings = bookings;
    setBookings((prevBookings) => prevBookings.filter((b) => b._id !== id));

    try{
      await bookingAPI.delete(id, token)
      
    } catch (error) {
      console.log(error)
      setBookings(prevBookings);
    } finally {
      setLoading(false)
    }
  }

 
  return (
    <>
      <h1>Bookings</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <BookingList onSave={saveBooking} onDelete={handleDelete} bookings={bookings} />

      {/* {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )} */}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default BookingsPage;
