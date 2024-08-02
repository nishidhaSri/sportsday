import PropTypes from "prop-types";
import React from "react";

const Fallback = ({title, description}) => {
    return (
        <div className="fallback">
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