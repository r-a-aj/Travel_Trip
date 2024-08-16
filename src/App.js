import {useState, useContext} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import BookTrip from './components/BookTrip'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import {AuthProvider, Context} from './components/Context/context'
import Login from './components/Login'
import './App.css'

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useContext(Context)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

function App() {
  const {isAuthenticated} = useContext(Context)

  const [trips, setTrips] = useState([])

  const handleTripConfirmed = tripDetails => {
    const newTrip = {
      id: trips.length + 1, // Generate unique ID
      ...tripDetails,
    }
    setTrips([...trips, newTrip])
  }

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <Login />}
          </Route>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/BookTrip">
            <BookTrip onTripConfirmed={handleTripConfirmed} />
          </PrivateRoute>
          <PrivateRoute path="/MyTrips">
            <MyTrips trips={trips} />
          </PrivateRoute>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
