// eslint-disable-next-line no-unused-vars
import React from 'react'
import './index.css'

const NotFound = () => (
  //   const handleGoBack = () => {
  //     window.history.back()
  //   }

  <div className="not-found-container">
    <img
      src="https://inspirefcu.org/wp-content/uploads/2022/09/404-inspire-e1698689452515.png"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found.</h1>
    <p>We are sorry, the page you requested could not be found.</p>
  </div>
)

export default NotFound
