import './Card.css';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Card = ({ className, children }) => {
    const classes = 'card ' + (className || '');

    return <div className={classes}>{children}</div>;
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(Card);
