import {useHistory} from 'react-router-dom'
import './index.css'

function HomePage() {
  const history = useHistory()

  return (
    <div className="home">
      <div className="content">
        <h1>Travel. Relax. Memories.</h1>
        <p>
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <button
          type="button"
          className="book-trip-button"
          onClick={() => history.push('/BookTrip')}
        >
          Book a New Trip
        </button>
      </div>
      <div className="image-container">
        <img
          src="https://i.postimg.cc/NjLTdf12/model1.png"
          alt="Travel"
          className="travel-image"
        />
      </div>
    </div>
  )
}

export default HomePage
