import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styles from '../styles/navigation.module.scss';

const Navigation = () => {
   return (
      <div className={styles.navContainer}>
         <Link to='/'>
            <div className={styles.home}>
               <img src={logo} alt='logo' />
               <h2>Sports Cad</h2>
            </div>
         </Link>
         <Link to='/booking'>
            <button className={styles.btn}>Book Now</button>
         </Link>
      </div>
   );
};

export default Navigation;
