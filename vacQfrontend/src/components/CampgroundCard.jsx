import { Link } from 'react-router';
import { Campground } from './construnctor/Campground';

function formatDescription(address) {
  return address.substring(0, 60) + '...';
}

function CampgroundCard(props) {
  const { campground, onEdit } = props;
  
  const handleEditClick = (camgroundBeingEdited) => {
    onEdit(camgroundBeingEdited);
  };

  return (
    <div className="card">
      <img src={campground.imageUrl} alt={campground._id} />
      <section className="section dark">
        <Link to={'/campgrounds/' + campground._id}>
          <h5 className="strong">
            <strong>{campground.name}</strong>
          </h5>
          <p>{formatDescription(campground.address)}</p>
          <p>Tel : {campground.tel.toLocaleString()}</p>
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
