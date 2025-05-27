import './Expenses.css';
import Card from '../UI/Card';
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import { useExpenses } from '../../context/ExpensesContext';

const Expenses = ({
    expenses,
    filteredYear,
    onFilterChange,
    onDeleteExpense,
}) => {
    const { resetToDemo } = useExpenses();

    // Используем useCallback для предотвращения ненужных ререндеров
    const handleDeleteExpense = useCallback(
        (id) => {
            onDeleteExpense(id);
        },
        [onDeleteExpense]
    );

    return (
        <div className='expenses-container'>
            <Card className='expenses'>
                <ExpensesFilter
                    selected={filteredYear}
                    onChangeFilter={onFilterChange}
                    onReset={resetToDemo}
                />
                <ExpensesChart expenses={expenses} />
                <ExpensesList
                    expenses={expenses}
                    onDeleteExpense={handleDeleteExpense}
                />
            </Card>
        </div>
    );
};

Expenses.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
    filteredYear: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(Expenses);
