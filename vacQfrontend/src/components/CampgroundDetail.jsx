


export default function CampgroundDetail(props) {
    const { campground, onEdit } = props;

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img className="rounded" src={campground.imageUrl} alt={campground.name} />
          <section className="section dark">
            <h3 className="strong">
              <strong>{campground.name}</strong>
            </h3>
            <p>{campground.address}</p>
            <p>tel : {campground.tel}</p>

            
            <p>
              <mark className="active">
                {' '}
                {campground.isActive ? 'active' : 'inactive'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
