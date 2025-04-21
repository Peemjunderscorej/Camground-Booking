import { Booking } from './construnctor/Booking';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm({ booking: initialProject, onSave, onCancel }) {
    const [booking, setBooking] = useState(initialProject);
    const [errors, setErrors] = useState({
        user: '',
        hospital: '',
        createdAT: ''
    });

    const [invalidSubmit, setInvalidSubmit] = useState(false)




const getDayName = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const isDateRangeValid = (startDateISO, endDateISO, availableDays) => {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  const currentDate = new Date(startDate);

  console.log("startDate is : ", startDate)
  console.log("endDate is : ", endDate)
  console.log("currentDate is : ", currentDate)

  while (currentDate <= endDate) {
    const dayName = getDayName(currentDate);
    if (!availableDays.includes(dayName)) {
      console.log("date is false")
      return false; 
    }
    currentDate.setDate(currentDate.getDate() + 1); 
  }
  console.log("date is true")
  return true; 
};

const isAllowedDay = (date) =>
    booking?.hospital?.availableDays?.includes(getDayName(date)) ?? false;




    const handleSubmit = (event) => {
        event.preventDefault();
        setInvalidSubmit(false)
        if (!isValid()) return;
        if (!isDateRangeValid(booking.arriving, booking.departing, booking.hospital.availableDays)){
            setInvalidSubmit(true)
    
            return;
        }
    
        onSave(booking);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
      
        setBooking((prev) => {
          const updatedBooking = new Booking({ ...prev });
      

          if (name.startsWith("user.")) {
            const field = name.split(".")[1];
            updatedBooking.user = { ...prev.user, [field]: updatedValue };
          } else if (name.startsWith("hospital.")) {
            const field = name.split(".")[1];
            
            updatedBooking.hospital = {
              ...(typeof prev.hospital === 'object' ? prev.hospital : { _id: prev.hospital }),
              [field]: updatedValue
            };
          }
           else {
            updatedBooking[name] = updatedValue;
          }
      
          return updatedBooking;
        });
      };

      const formatForInput = (dateStr) => {
        return dateStr ? new Date(dateStr).toISOString().slice(0, 16) : "";
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

    const updateDate = (field, date) => {
        setBooking(prev => new Booking({
          ...prev,
          [field]: date
        }));
      };

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
            {/* <input
  type="text"
  name="user.name"
  value={booking.user?.name || ""}
  onChange={handleChange}
/> */}
<p>{booking.user.name}</p>
            {errors.user.length > 0 && (
                <div className="card error">
                    <p>{errors.user.name}</p>
                </div>
            )}

            <label htmlFor="user">Booking User Email</label>
            {/* <input
  type="text"
  name="user.email"
  value={booking.user?.email || ""}
  onChange={handleChange}
/> */}
<p>{booking.user.email}</p>
            {errors.user.length > 0 && (
                <div className="card error">
                    <p>{errors.user.email}</p>
                </div>
            )}

            <label htmlFor="user">Booking User Tel</label>
            {/* <input
  type="text"
  name="user.tel"
  value={booking.user?.tel || ""}
  onChange={handleChange}
/> */}
<p>{booking.user.tel}</p>
            {errors.user.length > 0 && (
                <div className="card error">
                    <p>{errors.user.tel}</p>
                </div>
            )}


            <label htmlFor="hospital">Booking Campground</label>
            {/* <textarea
  name="hospital.name"
  value={booking.hospital?.name || ""}
  onChange={handleChange}
/> */}
<p>{booking.hospital.name}</p>
            {errors.hospital.length > 0 && (
                <div className="card error">
                    <p>{errors.hospital.name}</p>
                </div>
            )}

        

<label htmlFor="user">Arriving</label>
 
  <DatePicker
    selected={booking.arriving}
    onChange={(date) => updateDate('arriving', date)}
    filterDate={isAllowedDay}
    dateFormat="yyyy-MM-dd"
    className={`form-control  ${invalidSubmit ? 'border border-red-500 bg-red-100' : ''}`}
    placeholderText="Select arriving date"
    required
  />
 
  

            {errors.createdAT.length > 0 && (
                <div className="card error">
                    <p>{errors.arriving}</p>
                </div>
            )}


<label htmlFor="user">Departure</label>
  <DatePicker
    selected={booking.departing}
    onChange={(date) => updateDate('departing', date)}

    filterDate={isAllowedDay}
    dateFormat="yyyy-MM-dd"
    className={`form-control ${invalidSubmit ? 'border border-red-500 bg-red-100' : ''}`}
    placeholderText="Select departure date"
    required
  />

            {errors.createdAT.length > 0 && (
                <div className="card error">
                    <p>{errors.createdAT}</p>
                </div>
            )}

{invalidSubmit && (<p>The reservations date are invalid.</p>)}

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
