
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { campgroundAPI } from '../components/api/CampgroundAPI';
import CampgroundDetail from '../components/CampgroundDetail';
import { bookingAPI } from '../components/api/BookingAPI';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function CampgroundPage() {
  const { id } = useParams();  
  const [campground, setCampground] = useState(null);
  const[loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    arriving: null,
    departure: null
  });
const {arriving,departure}=formData;
const token = localStorage.getItem('token');
const [error,setError] = useState(false)
const [invalidSubmit, setInvalidSubmit] = useState(false)


const navigate = useNavigate()


  useEffect(() => {
    try{
      async function fetchCampground() {
        setLoading(true)
        try{
            const data = await campgroundAPI.find(id)
            setCampground(data)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        console.log(`id is ${id}`)
        console.log(`campground is ${campground}`)
    }
    fetchCampground();
    } catch (error){
      console.log(error)
    } finally {

    }
    
  }, [id]);

  useEffect(() => {
    if (campground) {
      console.log(`✅ campground loaded:`, campground);
    }
  }, [campground]);
 
  if (!campground) {
    return <div>Loading...</div>;
  }



const getDayName = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const isDateRangeValid = (startDateISO, endDateISO, availableDays) => {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  const currentDate = new Date(startDate);

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

const isAllowedDay = (date) => {
  return campground.availableDays.includes(getDayName(date));
};

const onSubmit = async (e) => {
  e.preventDefault();
  const data = { ...campground, arriving, departure };

  try {
    setInvalidSubmit(false)


    if(isDateRangeValid(data.arriving,data.departure, campground.availableDays)){
      console.log("post data is : ", data._id);
      await bookingAPI.post(data._id, token, arriving.toISOString(), departure.toISOString());
      navigate('/campgrounds');
      
    }

    else{
      setInvalidSubmit(true)
    }
    
  } catch (error) {
    setError(true)
    console.log(error);
  }
};

  return (
    <>
    <section className='heading'>
    <h1>Camp Q: A Campground
        Reservation System</h1>
    <p>Please choose from an
        option below</p>
</section>
   

    <CampgroundDetail campground={campground} />
 


  
    <section className='form'>
    <form onSubmit={onSubmit}>

    <div className="form-group row">
  
  <p>Arriving</p>
 
  <DatePicker
    selected={arriving}
    onChange={(date) => setFormData(prev => ({ ...prev, arriving: date }))}
    filterDate={isAllowedDay}
    dateFormat="yyyy-MM-dd"
    className={`form-control  ${invalidSubmit ? 'border border-red-500 bg-red-100' : ''}`}
    placeholderText="Select arriving date"
    required
  />
 
  
</div>

<div className="form-group row">
  <p>Departure</p>
  <DatePicker
    selected={departure}
    onChange={(date) => setFormData(prev => ({ ...prev, departure: date }))}
    filterDate={isAllowedDay}
    dateFormat="yyyy-MM-dd"
    className={`form-control ${invalidSubmit ? 'border border-red-500 bg-red-100' : ''}`}
    placeholderText="Select departure date"
    required
  />
</div>

        {error && (<p>You can only make up to 3 campground reservations.</p>)}

        {invalidSubmit && (<p>The reservations date are invalid.</p>)}
        
        <div className='form-group'>
            <button className='btn btnblock'>Submit</button>
        </div>

    </form>
    </section>
 
    </>
  );
}

export default CampgroundPage;
