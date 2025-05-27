import React from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import { useExpenses } from './context/ExpensesContext';

const App = () => {
    const {
        filteredExpenses,
        filteredYear,
        addExpense,
        deleteExpense,
        setFilteredYear,
    } = useExpenses();

    return (
        <div className='app'>
            <h1 className='app-title'>Expense Tracker</h1>
            <div className='app-actions'>
                <NewExpense onAddExpense={addExpense} />
            </div>
            <Expenses
                expenses={filteredExpenses}
                filteredYear={filteredYear}
                onFilterChange={setFilteredYear}
                onDeleteExpense={deleteExpense}
            />
        </div>
    );
};

export default App;
