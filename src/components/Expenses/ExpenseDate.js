import './ExpenseDate.css';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ExpenseDate = ({ date }) => {
    // Используем date-fns для форматирования даты
    const month = format(date, 'MMMM');
    const day = format(date, 'dd');
    const year = format(date, 'yyyy');

    return (
        <div className='expense-date'>
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__year'>{year}</div>
            <div className='expense-date__day'>{day}</div>
        </div>
    );
};

ExpenseDate.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpenseDate);
