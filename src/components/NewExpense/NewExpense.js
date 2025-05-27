import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = ({ onAddExpense }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Используем useCallback для предотвращения ненужных ререндеров
    const saveExpenseDataHandler = useCallback(
        (enteredExpenseData) => {
            const expenseData = {
                ...enteredExpenseData,
                id: Date.now().toString(), // Более надежный способ генерации ID
            };
            onAddExpense(expenseData);
            setIsEditing(false);
        },
        [onAddExpense]
    );

    const startEditingHandler = useCallback(() => {
        setIsEditing(true);
    }, []);

    const stopEditingHandler = useCallback(() => {
        setIsEditing(false);
    }, []);

    return (
        <div className='new-expense'>
            {!isEditing ? (
                <button
                    onClick={startEditingHandler}
                    className='new-expense__button'
                    aria-label='Add new expense'
                >
                    Add New Expense
                </button>
            ) : (
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
            )}
        </div>
    );
};

NewExpense.propTypes = {
    onAddExpense: PropTypes.func.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(NewExpense);
