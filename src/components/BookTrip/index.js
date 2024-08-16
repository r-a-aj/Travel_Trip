import {useState} from 'react'
import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'Car', displayText: 'Car'},
  {value: 'Flight', displayText: 'Flight'},
  {value: 'Bus', displayText: 'Bus'},
  {value: 'Train', displayText: 'Train'},
]

function BookTrip({onTripConfirmed}) {
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    startDate: '',
    endDate: '',
    travelAssistance: false,
  })
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const {name, value, type, checked} = e.target
    setDetails({
      ...details,
      [name]: type === 'checkbox' ? checked : value,
    })

    if (name === 'name' || name === 'startLocation' || name === 'endLocation') {
      e.target.classList.toggle('red-placeholder', value === '')
    }
  }

  const validateStep1 = () => {
    const {name, startLocation, endLocation} = details
    const step1Errors = {}
    if (!name) step1Errors.name = 'Enter your name'
    if (!startLocation) step1Errors.startLocation = 'Enter your start location'
    if (!endLocation) step1Errors.endLocation = 'Enter your end location'
    return step1Errors
  }

  const validateStep2 = () => {
    const {startDate, endDate} = details
    const step2Errors = {}
    if (!startDate) step2Errors.startDate = 'Select start date'
    if (!endDate) step2Errors.endDate = 'Select end date'
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      step2Errors.endDate = 'The end date cannot be less than the start date'
    }
    return step2Errors
  }

  const handleNext = () => {
    let validationErrors = {}
    if (step === 1) validationErrors = validateStep1()
    if (step === 2) validationErrors = validateStep2()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleConfirm = () => {
    onTripConfirmed({
      ...details,
      adults,
      children,
      infants,
    })
    setStep(6)
    setDetails({
      name: '',
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
      travelAssistance: false,
    })
    setAdults(1)
    setChildren(0)
    setInfants(0)
  }

  const handleIncrement = (setter, value) => {
    setter(value + 1)
  }

  const handleDecrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1)
    }
  }

  const getStepClass = index => {
    if (step === index + 1) return 'active'
    if (step > index + 1)
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
          alt="success"
        />
      )
    return ''
  }

  return (
    <div className="bg-container">
      <div className="book-trip-container">
        <div className="steps-container">
          <div className="steps">
            {stepsList.map((stepItem, index) => (
              <div
                key={stepItem.stepId}
                className={`step ${getStepClass(index)}`}
              >
                <span className="step-number">{index + 1}</span>{' '}
                {stepItem.displayText}
              </div>
            ))}
          </div>
          <div className="form-container">
            {step === 1 && (
              <div className="step-content">
                <div className="details-head">
                  <h2>Your Details</h2>
                  <p>Enter your name and location details</p>
                </div>
                <div className="card-container">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={details.name}
                    onChange={handleChange}
                    className={errors.name ? 'error-input' : 'input-box'}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                  <label htmlFor="startLocation">Start Location</label>
                  <input
                    type="text"
                    id="startLocation"
                    name="startLocation"
                    placeholder="Enter start location"
                    value={details.startLocation}
                    onChange={handleChange}
                    className={
                      errors.startLocation ? 'error-input' : 'input-box'
                    }
                  />
                  {errors.startLocation && (
                    <p className="error-message">{errors.startLocation}</p>
                  )}
                  <label htmlFor="endLocation">End Location</label>
                  <input
                    type="text"
                    id="endLocation"
                    name="endLocation"
                    placeholder="Enter end location"
                    value={details.endLocation}
                    onChange={handleChange}
                    className={errors.endLocation ? 'error-input' : 'input-box'}
                  />
                  {errors.endLocation && (
                    <p className="error-message">{errors.endLocation}</p>
                  )}
                  <div className="btn-container">
                    <button type="button" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step-content">
                <div className="details-head">
                  <h2>Date Selection</h2>
                  <p>Select your Start and End Date</p>
                </div>
                <div className="card-container">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={details.startDate}
                    onChange={handleChange}
                    className={errors.startDate ? 'error-input' : 'input-box'}
                  />
                  {errors.startDate && (
                    <p className="error-message">{errors.startDate}</p>
                  )}
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={details.endDate}
                    onChange={handleChange}
                    className={errors.endDate ? 'error-input' : 'input-box'}
                  />
                  {errors.endDate && (
                    <p className="error-message">{errors.endDate}</p>
                  )}
                  <div className="btn-container">
                    <button
                      type="button"
                      className="previous-btn"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button type="button" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="details-head" style={{color: 'white'}}>
                  <h2>Guests</h2>
                  <p>Select your Guests</p>
                </div>
                <div className="guest-selection-container">
                  <div className="guest-row">
                    <span>
                      <small className="text-size">Adults</small>
                      <br />
                      <small>Age 13 or above</small>
                    </span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => handleDecrement(setAdults, adults)}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(setAdults, adults)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="hr-line" />
                  <div className="guest-row">
                    <span>
                      <small className="text-size">Children</small>
                      <br />
                      <small>Age 2-12</small>
                    </span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => handleDecrement(setChildren, children)}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(setChildren, children)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="hr-line" />
                  <div className="guest-row">
                    <span>
                      <small className="text-size">Infants</small>
                      <br />
                      <small>Under 2</small>
                    </span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => handleDecrement(setInfants, infants)}
                      >
                        -
                      </button>
                      <span>{infants}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(setInfants, infants)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="btn-container">
                    <button
                      type="button"
                      className="prev-button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="next-button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="step-content">
                <div className="details-head">
                  <h2>Travel Assistance</h2>
                  <p>Do you need travel assistance?</p>
                </div>
                <div className="card-container">
                  <label>
                    <input
                      type="checkbox"
                      name="travelAssistance"
                      checked={details.travelAssistance}
                      onChange={handleChange}
                    />
                    Travel Assistance
                  </label>
                  {details.travelAssistance && (
                    <div className="dropdown-container">
                      <label
                        htmlFor="travelAssistanceOption"
                        className="assist-option-head"
                      >
                        Travel Assistance
                      </label>
                      <select
                        id="travelAssistanceOption"
                        name="travelAssistanceOption"
                        value={details.travelAssistanceOption}
                        onChange={handleChange}
                        className="input-box"
                      >
                        {travelAssistanceList.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.displayText}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="assist-btn-container">
                    <button
                      type="button"
                      className="previous-btn"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button type="button" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="step-content">
                <div className="details-head">
                  <h2>Confirmation</h2>
                  <p>Confirm your details</p>
                </div>
                <div className="confirm-card-container">
                  <p className="confirm-text">
                    <strong>Name:</strong> {details.name}
                  </p>
                  <p className="confirm-text">
                    <strong>Start Location:</strong> {details.startLocation}
                  </p>
                  <p className="confirm-text">
                    <strong>End Location:</strong> {details.endLocation}
                  </p>
                  <p className="confirm-text">
                    <strong>Start Date:</strong> {details.startDate}
                  </p>
                  <p className="confirm-text">
                    <strong>End Date:</strong> {details.endDate}
                  </p>
                  <p className="confirm-text">
                    <strong>Guests:</strong> {adults + children + infants}
                  </p>
                  <p className="confirm-text">
                    <strong>Travel Assistance:</strong>{' '}
                    {details.travelAssistance
                      ? details.travelAssistanceOption
                      : 'None'}
                  </p>
                  <div className="btn-container">
                    <button
                      type="button"
                      className="previous-btn"
                      onClick={handlePrevious}
                    >
                      Cancel
                    </button>
                    <button type="button" onClick={handleConfirm}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="upload-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                  alt="completed-img"
                  className="completed-img"
                />
                <h2 className="complete-head">Awesome!</h2>
                <p className="complete-para">
                  Your booking has been confirmed.
                </p>
                <button
                  type="button"
                  className="new-trip-button"
                  onClick={() => setStep(1)}
                >
                  Book a New Trip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTrip
