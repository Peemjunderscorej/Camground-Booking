import { Booking } from './construnctor/Booking';
import { useState } from 'react';

function BookingForm({ booking: initialProject, onSave, onCancel }) {
    const [booking, setBooking] = useState(initialProject);
    const [errors, setErrors] = useState({
        user: '',
        hospital: '',
        createdAT: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(booking);
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

        let updatedBooking;
        setBooking((p) => {
            updatedBooking = new Booking({ ...p, ...change });
            return updatedBooking;
        });

        setErrors(() => validate(updatedBooking));
    };

    function validate(booking) {
        let errors = { user: '', hospital: '', createdAT: '' };
        if (booking.user.length === 0) {
            errors.user = 'Name is required';
        }
        if (booking.user.length > 0 && booking.user.length < 3) {
            errors.user = 'Name needs to be at least 3 characters.';
        }
        if (booking.hospital.length === 0) {
            errors.hospital = 'Description is required.';
        }
        if (booking.createdAT === 0) {
            errors.createdAT = 'Budget must be more than $0.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.user.length === 0 &&
            errors.hospital.length === 0 &&
            errors.createdAT.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="user">Booking user</label>
            <input
                type="text"
                name="user"
                placeholder="enter user"
                value={booking.user}
                onChange={handleChange}
            />
            {errors.user.length > 0 && (
                <div className="card error">
                    <p>{errors.user}</p>
                </div>
            )}

            <label htmlFor="hospital">Booking Description</label>
            <textarea
                name="hospital"
                placeholder="enter hospital"
                value={booking.hospital}
                onChange={handleChange}
            ></textarea>
            {errors.hospital.length > 0 && (
                <div className="card error">
                    <p>{errors.hospital}</p>
                </div>
            )}

            <label htmlFor="createdAT">Booking createdAT</label>
            <input
                type="datetime-local"
                name="createdAT"
                placeholder="enter createdAT"
                value={booking.createdAT}
                onChange={handleChange}
            />
            {errors.createdAT.length > 0 && (
                <div className="card error">
                    <p>{errors.createdAT}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={booking.isActive}
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

export default BookingForm;
