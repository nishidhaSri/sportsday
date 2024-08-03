import React from 'react';
import { Link } from 'react-router-dom';
import cheer from '../assets/home.svg';
import styles from '../styles/home.module.scss';

const Home = () => {
   return (
      <div data-testid='home-container' className={styles.home}>
         <div className={styles.content}>
            <div className={styles.titleContainer}>
               <div className={styles.title1}>Sports</div>
               <div className={styles.title2}>Competition</div>
            </div>
            <p>
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam incidunt adipisci
               animi nobis sequi cumque voluptatem, expedita facilis quia ducimus dicta tenetur,
               iure cupiditate obcaecati facere unde a accusamus modi
            </p>
            <Link to='/booking'>
               <button className={styles.btn}>Lets Go!</button>
            </Link>
         </div>
         <div className={styles.imgContainer}>
            <img src={cheer} alt='Home' />
         </div>
      </div>
   );
};

export default Home;
