import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Booking from './containers/Booking';
import Home from './containers/Home';

const App = () => {
   return (
      <div data-testid='app-container'>
            <Routes>
               <Route path='/booking' element={<Booking />} />
               <Route exact path='/' element={<Home />} />
               <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
      </div>
   );
};

export default App;
