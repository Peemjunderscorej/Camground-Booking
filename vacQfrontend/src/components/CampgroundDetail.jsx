


export default function CampgroundDetail(props) {
    const { campground, onEdit } = props;

  return (
   
    <div className="row">
      
      <div className="col-sm">
        <div className="detail-card card large">
        <img className="campground-img" src={"/RainChinese.jpeg"} alt={campground.name} />
          <section className="section dark">
            <h3 className="strong">
              <strong>{campground.name}</strong>
            </h3>
            <p>{campground.address}</p>
            <p>tel : {campground.tel}</p>
            {campground.availableDays.map((availableDay) => 
            (<span key={availableDay}  className="available-day">{availableDay}</span>)
          )}
            
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
