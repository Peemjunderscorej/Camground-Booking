
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

  useEffect(() => {
    async function loadCampgrounds() {
      setLoading(true);
      try {
        const data = await campgroundAPI.get(currentPage, searchText);
        setCampgrounds((prev) => currentPage === 1 ? data : [...prev, ...data]);
        // console.log("data in camgrounds.jsx is : " ,data)
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
   
      setCurrentPage(1);  // reset page
      setCampgrounds([]); // clear old results
      setSearchTrigger(prev => prev + 1);
   
  }, [searchText]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveCampground = (campground) => {
    console.log('Saving campground: ', campground);
    const updatedCampgrounds = campgrounds.map((c) => {
      return c.id === campground.id ? campground : c;
    });
    setCampgrounds(updatedCampgrounds);
    setLoading(true)
``
    try{

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

  return (
    <>
      <h1>Campgrounds</h1>

      <section className='form'>
        <form onSubmit={handleSearch}>
          <div className='form-group'>
            <input type="text" className='form-control'
                id='searchText' name='searchText' value={searchText} onChange={onChange}
                placeholder='Enter Your Search'/>
          </div>

          <div className='form-group'>
          <button className='btn btnblock'>Submit</button>
        </div>

        </form>
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

      <CampgroundList onSave={saveCampground} campgrounds={campgrounds} />

      {!loading && !error && (
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
