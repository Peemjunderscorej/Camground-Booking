import { Link } from 'react-router';

function formatDescription(address) {
  return address.substring(0, 60) + '...';
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
    <div className="card">
      <img src={booking.imageUrl} alt={booking._id} />
      <section className="section dark">
        <Link to={'/bookings/' + booking._id}>
          <h5 className="strong">
            <strong>{booking.user.name}</strong>
          </h5>
          <p>email : {booking.user.email}</p>
          <p>telephone number : {booking.user.tel}</p>
          <p>campground : {booking.hospital.name}</p>
          <p>createdAt : {booking.createdAt}</p> 
          {/* {(booking.arriving != undefined) && (<p>arriving : {booking.arriving}</p> )}
          {(booking.departing != undefined)&& (<p>departing : {booking.departing}</p> )} */}
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
