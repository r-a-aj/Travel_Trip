// eslint-disable-next-line no-unused-vars
import React from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'

function MyTrips({trips}) {
  const history = useHistory()

  return (
    <div className="my-trips-container">
      <div className="trip-cards-container">
        {trips.length === 0 ? (
          <div className="no-trips-container">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/travel-luggage-5694786-4789123.png?f=webp"
              alt="bag"
              className="travel-bag-icon"
            />
            <h3 className="empty-trip-head">No upcoming trips.</h3>
            <p className="empty-trip-para">
              When you book a trip, you will see your trip details here.
            </p>
            <button
              type="button"
              className="new-trip-button"
              onClick={() => history.push('/login')}
            >
              Book a New Trip
            </button>
          </div>
        ) : (
          <>
            <div className="trip-head">
              <h3>My Trips</h3>
            </div>
            {trips.map(trip => (
              <div key={trip.id} className="trip-card">
                <h3>{trip.name}</h3>
                <p>
                  <span className="trip-date">Date</span>
                  <br />
                  <div className="trip-date">
                    <strong /> {trip.startDate}
                    <span> to </span> {trip.endDate}
                  </div>
                  <br />
                </p>
                <button type="button" className="new-trip-cancel-button">
                  Cancel
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default MyTrips
