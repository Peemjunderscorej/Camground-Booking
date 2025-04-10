
import { useState, useEffect } from 'react';
import { campgroundAPI } from '../components/CampgroundAPI';
import { Campground } from "../components/Campground";
import CampgroundList from "../components/CampgroundList";

function CampgroundsPage() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadCampgrounds() {
      setLoading(true);
      try {
        const data = await campgroundAPI.get(currentPage);
        if (currentPage === 1) {
          setCampgrounds(data);
        } else {
          setCampgrounds((campgrounds) => [...campgrounds, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCampgrounds();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveCampground = (campground) => {
    console.log('Saving campground: ', campground);
    const updatedCampgrounds = campgrounds.map((c) => {
      return c.id === campground.id ? campground : c;
    });
    setCampgrounds(updatedCampgrounds);
  };

  return (
    <>
      <h1>Campgrounds</h1>

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
