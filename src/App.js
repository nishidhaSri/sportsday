import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Booking from './containers/Booking';
import Home from './containers/Home';

const App = () => {
   return (
      <div data-testid='app-container'>
            <Navigation />
            <Routes>
               <Route path='/booking' element={<Booking />} />
               <Route exact path='/' element={<Home />} />
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
      </div>
   );
};

export default App;
