import { Campground } from './Campground';
import { useState } from 'react';

function CampgroundForm({ campground: initialProject, onSave, onCancel }) {
    const [campground, setCampground] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(campground);
    };

    const handleChange = (event) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === "checkbox" ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue,
        };

        let updatedCampground;
        setCampground((p) => {
            updatedCampground = new Campground({ ...p, ...change });
            return updatedCampground;
        });

        setErrors(() => validate(updatedCampground));
    };

    function validate(campground) {
        let errors = { name: '', address: '', tel: '' };
        if (campground.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (campground.name.length > 0 && campground.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (campground.address.length === 0) {
            errors.description = 'Description is required.';
        }
        if (campground.tel === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.address.length === 0 &&
            errors.tel.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Campground Name</label>
            <input
                type="text"
                name="name"
                placeholder="enter name"
                value={project.name}
                onChange={handleChange}
            />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}

            <label htmlFor="description">Campground Description</label>
            <textarea
                name="description"
                placeholder="enter description"
                value={project.address}
                onChange={handleChange}
            ></textarea>
            {errors.address.length > 0 && (
                <div className="card error">
                    <p>{errors.address}</p>
                </div>
            )}

            <label htmlFor="budget">Campground Budget</label>
            <input
                type="number"
                name="budget"
                placeholder="enter budget"
                value={project.tel}
                onChange={handleChange}
            />
            {errors.tel.length > 0 && (
                <div className="card error">
                    <p>{errors.tel}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleChange}
            />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CampgroundForm;
