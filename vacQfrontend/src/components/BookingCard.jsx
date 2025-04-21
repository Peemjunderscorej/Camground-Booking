import { Link } from 'react-router';

function formatDescription(address) {
  return address.length > 60 ? address.substring(0, 60) + '...' : address;
}

function formatPhoneNumber(tel) {
  const cleaned = ('' + tel).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  return match ? `${match[1]}-${match[2]}-${match[3]}` : tel;
}

function BookingCard(props) {
  const { booking, onEdit, onDelete } = props;
  
  const handleEditClick = (camgroundBeingEdited) => {
    onEdit(camgroundBeingEdited);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      onDelete(booking._id);
    }
  };

  return (
    <div className="booking-card card">
      <img src={"RainChinese.jpeg"} alt={booking._id} />
      <section className="section dark">
        <Link to={'/bookings/' + booking._id}>
          <h5 className="strong">
            <strong>{booking.user.name}</strong>
          </h5>
          <p>User Email : {booking.user.email}</p>
          <p>User Tel : {formatPhoneNumber(booking.user.tel)}</p>
          <p>Campground : {booking.hospital.name}</p>
          <p>Arriving: {new Date(booking.arriving).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}</p>

<p>Departing: {new Date(booking.departing).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}</p>

{booking.hospital.availableDays.map((availableDay) => 
            (<span key={availableDay}  className="available-day">{availableDay}</span>)
          )}
          <br/>
        </Link>
        <button
          className="bordered"
          onClick={() => {
            handleEditClick(booking);
          }}
        >
          <span className="icon-edit"></span>
          Edit
        </button>

        <button
          className="bordered"
          onClick={() => {
            handleDeleteClick();
          }}
        >
          <span className="icon-edit"></span>
          delete
        </button>
      </section>
    </div>
  );
}

export default BookingCard;
