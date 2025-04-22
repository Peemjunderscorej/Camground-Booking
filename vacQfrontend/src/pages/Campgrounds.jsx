
import { useState, useEffect } from 'react';
import { campgroundAPI } from '../components/api/CampgroundAPI';
import { Campground } from "../components/construnctor/Campground";
import CampgroundList from "../components/CampgroundList";

function CampgroundsPage() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData,setFormData] = useState({
    searchText: ''
  })
  const {searchText} = formData
  const [searchTrigger, setSearchTrigger] = useState(0);
  const token = localStorage.getItem('token');
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    async function loadCampgrounds() {
      setLoading(true);
      try {
        const data = await campgroundAPI.get(currentPage, searchText);
        setCampgrounds((prev) => currentPage === 1 ? data : [...prev, ...data]);
        // console.log("data in camgrounds.jsx is : " ,data)
        setHasMore(data.length === limit);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        
      } finally {
        setLoading(false);
      }
    }
    loadCampgrounds();
    
  }, [currentPage,searchTrigger]);

  useEffect(() => {
   
    const delaySearch = setTimeout(() => {
      setCurrentPage(1);
      setCampgrounds([]);
      setSearchTrigger(prev => prev + 1);
    }, 500); 
  
    return () => clearTimeout(delaySearch); 
   
  }, [searchText]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveCampground = async(campground) => {
    console.log('Saving campground: ', campground);
    const updatedCampgrounds = campgrounds.map((c) => {
      return c._id === campground._id ? campground : c;
    });
    setCampgrounds(updatedCampgrounds);
    setLoading(true)
    try{
        await campgroundAPI.put(campground, token)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
  };

  const onChange = (e) =>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }));
}

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for campground :', searchText)
    
  }

  const handleDayClick = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)  
        : [...prev, day]              
    );
  };
  return (
    <>
      <section className='heading'>
  <h1>Camp Q: A Campground Reservation System</h1>
  <p>View available campgrounds below.</p>
</section>

      <section className='form'>
        <form onSubmit={handleSearch}>
          <div className='form-group'>
            <input type="text" className='form-control'
                id='searchText' name='searchText' value={searchText} onChange={onChange}
                placeholder='Enter Your Search'/>
          </div>

         

        </form>

        

      </section>
      <section className="day-filters" style={{ marginBottom: '1rem' }}>
  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
    <button
      key={day}
      onClick={() => handleDayClick(day)}
      className={`day-button ${selectedDays.includes(day) ? 'active' : ''}`}
      style={{
        margin: '0.25rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        backgroundColor: selectedDays.includes(day) ? '#124640' : '#f9f9f9',
        color: selectedDays.includes(day) ? '#fff' : '#000',
        cursor: 'pointer',
      }}
    >
      {day}
    </button>
  ))}
</section>
      

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

<CampgroundList 
  onSave={saveCampground} 
  campgrounds={
    selectedDays.length === 0
      ? campgrounds
      : campgrounds.filter(cg =>
          cg.availableDays.some(day => selectedDays.includes(day))
        )
  }
/>

      {!loading && !error && hasMore && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default CampgroundsPage;
