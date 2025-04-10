import { Campground } from './Campground';
import ProjectCard from './CampgroundCard';
import ProjectForm from './CampgroundForm';
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
        <div key={campground.id} className="cols-sm">
            {campground === campgroundBeingEdited ? (
                <ProjectForm campground={campground} onSave={onSave} onCancel={cancelEditing} />
            ) : (
                <ProjectCard campground={campground} onEdit={handleEdit} />
            )}
        </div>
    ));

    return <div className="row">{items}</div>;
}

export default CampgroundList;
