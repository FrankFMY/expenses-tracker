import './ExpenseItem.css';
import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ExpenseItem = (props) => {
    const { title, amount, date, id, onDelete } = props;

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    };

    return (
        <li>
            <Card className='expense-item'>
                <ExpenseDate date={date} />
                <div className='expense-item__description'>
                    <h2>{title}</h2>
                    <div className='expense-item__price'>
                        ${amount.toFixed(2)}
                    </div>
                </div>
                {onDelete && (
                    <button
                        className='expense-item__delete'
                        onClick={handleDelete}
                        aria-label='Delete expense'
                    >
                        ×
                    </button>
                )}
            </Card>
        </li>
    );
};

ExpenseItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onDelete: PropTypes.func,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpenseItem);
