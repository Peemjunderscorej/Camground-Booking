
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { campgroundAPI } from '../components/api/CampgroundAPI';
import CampgroundDetail from '../components/CampgroundDetail';
import { bookingAPI } from '../components/api/BookingAPI';
import { useNavigate } from 'react-router-dom';


function CampgroundPage() {
  const { id } = useParams();  
  const [campground, setCampground] = useState(null);
  const[loading,setLoading] = useState(false)
  const [formData,setFormData]=useState({
    arriving: '',
    departure: '',
});
const {arriving,departure}=formData;
const token = localStorage.getItem('token');


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
 
  if (!campground) {
    return <div>Loading...</div>;
  }

const onChange = (e) =>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }));
}

const onSubmit = async (e) => {
  e.preventDefault();
  const data = { ...campground, arriving, departure };

  try {
    console.log("post data is : ", data._id);
    await bookingAPI.post(data._id, token, arriving, departure);
    navigate('/campgrounds');
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
    <div>
      <CampgroundDetail campground={campground}/>
    </div>

    <div>
    <section className='form'>
    <form onSubmit={onSubmit}>

        <div className="form-group">
            <input type="date" className='form-control'
                id='arriving' name='arriving' value={arriving} onChange={onChange}
                placeholder='Enter Your Arriving Date' required/>
        </div>

        <div className="form-group">
            <input type="date" className='form-control'
                id='departure' name='departure' value={departure} onChange={onChange}
                placeholder='Enter Your Departure Date' required/>
        </div> 
        
        <div className='form-group'>
            <button className='btn btnblock'>Submit</button>
        </div>

    </form>
    </section>
    </div>
    </>
  );
}

export default CampgroundPage;
