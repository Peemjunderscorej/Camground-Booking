import { Link } from 'react-router';
import { Campground } from './construnctor/Campground';

function formatDescription(address) {
  return address.length > 32 ? address.substring(0, 32) + '...' : address;
}



function formatPhoneNumber(tel) {
  const cleaned = ('' + tel).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  const formatted = match ? `${match[1]}-${match[2]}-${match[3]}` : tel;

  
  return formatted.length > 28 ? formatted.substring(0, 28) + '...' : formatted;
}

function CampgroundCard(props) {
  const { campground, onEdit } = props;
  
  const handleEditClick = (camgroundBeingEdited) => {
    onEdit(camgroundBeingEdited);
  };

  return (
    <div className="card">
      <Link to={'/campgrounds/' + campground._id}>
        <img src={"/RainChinese.jpeg"} alt={campground._id} />
        </Link>
      <section className="section dark">
      <Link to={'/campgrounds/' + campground._id}>
          <h5 className="strong">
            <strong>{formatDescription(campground.name)}</strong>
          </h5>
          <p>{formatDescription(campground.address)}</p>
          <p>Tel : {formatPhoneNumber(campground.tel)}</p>
          {campground.availableDays.map((availableDay) => 
            (<span key={availableDay}  className="available-day">{availableDay}</span>)
          )}
          <br/>
        </Link>
        <button
          className="bordered"
          onClick={() => {
            handleEditClick(campground);
          }}
        >
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default CampgroundCard;
