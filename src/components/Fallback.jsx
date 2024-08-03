import PropTypes from "prop-types";
import React from "react";
import styles from '../styles/fallback.module.scss';

const Fallback = ({title, description}) => {
    return (
        <div className={styles.fallback}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

Fallback.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default Fallback