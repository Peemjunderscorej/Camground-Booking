import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt}
from 'react-icons/fa'
import AnimationButton from '../components/AnimationButton';
import '../components/FadeIn.css'

function Home(){

return(
<>

<section className='heading'>
    <h1>Camp Q: A Campground
        Reservation System</h1>
    <p>Please choose from an
        option below</p>
</section>

<Link to='/campgrounds'
    className='btn btn-reverse btn-block'>
    <FaQuestionCircle/>Create Campground Reservation
</Link>

<Link to='/bookings'
    className='btn btn-block'>
    <FaTicketAlt />View My Campground Reservation
</Link>


</>
)
}
export default Home;