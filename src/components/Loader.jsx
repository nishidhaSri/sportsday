import React from "react";
import styles from '../styles/loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader} data-testid="loader"></div>
    )
}

export default Loader