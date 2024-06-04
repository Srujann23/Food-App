import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import 'C:\\Users\\Owner\\OneDrive\\Desktop\\MERN\\Food-Delivery\\mernapp\\node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap-dark-5/dist/js/bootstrap.bundle';
import 'C:\\Users\\Owner\\OneDrive\\Desktop\\MERN\\Food-Delivery\\mernapp\\node_modules/bootstrap/js/dist/carousel.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
