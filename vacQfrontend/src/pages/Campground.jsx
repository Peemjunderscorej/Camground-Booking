
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
    
  }, [id,Navigate]);
 
  if (!campground) {
    return <div>Loading...</div>;
  }

const onChange = (e) =>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }));
}
const onSubmit =(e) => {
     e.preventDefault()
     const userData={
         arriving,
         departure
     }

     try{
      async function postBooking() {
        const data = {...camground, arriving, departure}
        await bookingAPI.post(data)
      }
     } catch(error) {
        console.log(error)
     } finally {
        navigate('/');
     }
}

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
