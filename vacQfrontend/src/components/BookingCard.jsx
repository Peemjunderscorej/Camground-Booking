import { Link } from 'react-router';

function formatDescription(address) {
  return address.substring(0, 60) + '...';
}

function BookingCard(props) {
  const { booking, onEdit } = props;
  
  const handleEditClick = (camgroundBeingEdited) => {
    onEdit(camgroundBeingEdited);
  };

  return (
    <div className="card">
      <img src={booking.imageUrl} alt={booking._id} />
      <section className="section dark">
        <Link to={'/bookings/' + booking._id}>
          <h5 className="strong">
            <strong>{booking.user.name}</strong>
          </h5>
          <p>{booking.hospital.name}</p>
           <p>createdAt : {booking.createdAt}</p> 
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
      </section>
    </div>
  );
}

export default BookingCard;
