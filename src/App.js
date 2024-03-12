import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Container from './components/Container';
import Artwork from './components/Artwork'
import Upload from './components/Upload';
import Cart from './components/Cart';
import { Provider } from "react-redux";
import store from "./features/store";
import Profile from './components/Profile';
import Created from './components/Created'
import Editprofile from './components/Editprofile';

// import artworks from '../data/Listartworks.json';
// import { Container } from '@mui/material';
// import Profile from './components/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/home' element={<Container />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/artwork/:id' element={<><Artwork /> <Container /></>} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<><Profile /></>} />
          <Route path='/edit-profile' element={<><Editprofile /></>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
