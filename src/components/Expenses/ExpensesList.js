import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = ({ expenses, onDeleteExpense }) => {
    if (expenses.length === 0) {
        return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
    }

    return (
        <ul className='expenses-list'>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    id={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                    onDelete={onDeleteExpense}
                />
            ))}
        </ul>
    );
};

ExpensesList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
    onDeleteExpense: PropTypes.func,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpensesList);
