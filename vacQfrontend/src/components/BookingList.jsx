
import BookingCard from './BookingCard';
import BookingForm from './BookingForm';
import { useState } from 'react';

function BookingList({ bookings, onSave, onDelete }) {
    const [bookingBeingEdited, setBookingBeingEdited] = useState({});

    const handleEdit = (booking) => {
        setBookingBeingEdited(booking);
    };
    
    const cancelEditing = () => {
        setBookingBeingEdited({});
    };

    const items = bookings.map(booking => (
        <div key={booking._id} className="cols-sm">
            {booking === bookingBeingEdited ? (
                <BookingForm booking={booking} onSave={onSave} onCancel={cancelEditing} />
            ) : (
                <BookingCard booking={booking} onEdit={handleEdit} onDelete={onDelete}/>
            )}
        </div>
       
    )
);

function checkDuplicateIds(bookings) {
    const seen = new Set();
    const duplicates = new Set();

    for (const booking of bookings) {
        if (seen.has(booking._id)) {
            duplicates.add(booking._id);
        }
        seen.add(booking._id);
    }

    if (duplicates.size > 0) {
        console.error("⚡ Duplicate _id found:", Array.from(duplicates));
    } else {
        console.log("✅ No duplicate _id found.");
    }
}


checkDuplicateIds(bookings);

    return <div className="row">{items}</div>;
}

export default BookingList;
