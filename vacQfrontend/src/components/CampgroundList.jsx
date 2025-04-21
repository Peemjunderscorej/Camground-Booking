import { Campground } from './construnctor/Campground';
import CampgroundCard from './CampgroundCard';
import CampgroundForm from './CampgroundForm';
import { useState } from 'react';

function CampgroundList({ campgrounds, onSave }) {
    const [campgroundBeingEdited, setCampgroundBeingEdited] = useState({});

    const handleEdit = (campground) => {
        setCampgroundBeingEdited(campground);
    };
    
    const cancelEditing = () => {
        setCampgroundBeingEdited({});
    };

    const items = campgrounds.map(campground => (
        <div key={campground._id} className="cols-sm">
            {campground === campgroundBeingEdited ? (
                <CampgroundForm campground={campground} onSave={(updatedCampground) => {
                    onSave(updatedCampground);
                    setCampgroundBeingEdited({}); 
                  }} onCancel={cancelEditing} />
            ) : (
                <CampgroundCard campground={campground} onEdit={handleEdit} />
            )}
        </div>
    ));

    return <div className="row">{items}</div>;
}

export default CampgroundList;
