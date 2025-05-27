import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Демонстрационные данные
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'Toilet Paper',
        amount: 94.12,
        date: new Date(2025, 7, 14),
    },
    {
        id: 'e2',
        title: 'New TV',
        amount: 799.49,
        date: new Date(2025, 2, 12),
    },
    {
        id: 'e3',
        title: 'Car Insurance',
        amount: 294.67,
        date: new Date(2024, 2, 28),
    },
    {
        id: 'e4',
        title: 'New Desk (Wooden)',
        amount: 450,
        date: new Date(2023, 5, 12),
    },
];

// Начальное состояние
const initialState = {
    expenses: [],
    filteredYear: new Date().getFullYear().toString(),
};

// Типы действий
const ACTIONS = {
    SET_EXPENSES: 'SET_EXPENSES',
    ADD_EXPENSE: 'ADD_EXPENSE',
    DELETE_EXPENSE: 'DELETE_EXPENSE',
    SET_FILTERED_YEAR: 'SET_FILTERED_YEAR',
};

// Функция для сохранения расходов в localStorage
const saveExpensesToStorage = (expenses) => {
    try {
        // Преобразуем даты в строки для корректной сериализации
        const expensesToStore = expenses.map((expense) => ({
            ...expense,
            date: expense.date.toISOString(),
        }));
        localStorage.setItem('expenses', JSON.stringify(expensesToStore));
    } catch (error) {
        console.error('Error saving expenses to localStorage:', error);
    }
};

// Редьюсер для управления состоянием
const expensesReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_EXPENSES:
            return {
                ...state,
                expenses: action.payload,
            };
        case ACTIONS.ADD_EXPENSE:
            const updatedExpenses = [action.payload, ...state.expenses];
            saveExpensesToStorage(updatedExpenses);
            return {
                ...state,
                expenses: updatedExpenses,
            };
        case ACTIONS.DELETE_EXPENSE:
            const filteredExpenses = state.expenses.filter(
                (expense) => expense.id !== action.payload
            );
            saveExpensesToStorage(filteredExpenses);
            return {
                ...state,
                expenses: filteredExpenses,
            };
        case ACTIONS.SET_FILTERED_YEAR:
            return {
                ...state,
                filteredYear: action.payload,
            };
        default:
            return state;
    }
};

// Создание контекста
const ExpensesContext = createContext();

// Провайдер контекста
export const ExpensesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    // Загрузка данных из localStorage при монтировании компонента
    useEffect(() => {
        // Проверяем, есть ли демонстрационные данные в localStorage
        const hasDummyExpenses = () => {
            try {
                const storedExpenses = localStorage.getItem('expenses');
                if (!storedExpenses) return false;

                const parsedExpenses = JSON.parse(storedExpenses);
                // Проверяем наличие демонстрационных ID
                return parsedExpenses.some((expense) =>
                    ['e1', 'e2', 'e3', 'e4'].includes(expense.id)
                );
            } catch {
                return false;
            }
        };

        const storedExpenses = localStorage.getItem('expenses');
        let expensesToSet = [];

        if (storedExpenses) {
            try {
                const parsedExpenses = JSON.parse(storedExpenses);
                // Преобразуем строковые даты обратно в объекты Date
                const expensesWithDates = parsedExpenses.map((expense) => ({
                    ...expense,
                    date: new Date(expense.date),
                }));
                expensesToSet = expensesWithDates;
            } catch (error) {
                console.error('Error parsing stored expenses:', error);
                expensesToSet = [...DUMMY_EXPENSES];
            }
        } else {
            // Если в localStorage нет данных, используем демонстрационные данные
            expensesToSet = [...DUMMY_EXPENSES];
        }

        // Если демонстрационных данных нет, добавляем их
        if (!hasDummyExpenses()) {
            expensesToSet = [...expensesToSet, ...DUMMY_EXPENSES];
            saveExpensesToStorage(expensesToSet);
        }

        dispatch({
            type: ACTIONS.SET_EXPENSES,
            payload: expensesToSet,
        });
    }, []);

    // Фильтрация расходов по году
    const filteredExpenses = state.expenses.filter(
        (expense) =>
            expense.date.getFullYear().toString() === state.filteredYear
    );

    // Добавление нового расхода
    const addExpense = (expense) => {
        const newExpense = {
            ...expense,
            id: Date.now().toString(),
        };
        dispatch({ type: ACTIONS.ADD_EXPENSE, payload: newExpense });
    };

    // Удаление расхода
    const deleteExpense = (id) => {
        dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: id });
    };

    // Изменение года фильтрации
    const setFilteredYear = (year) => {
        dispatch({ type: ACTIONS.SET_FILTERED_YEAR, payload: year });
    };

    // Сброс до демонстрационных данных
    const resetToDemo = () => {
        dispatch({ type: ACTIONS.SET_EXPENSES, payload: DUMMY_EXPENSES });
        saveExpensesToStorage(DUMMY_EXPENSES);
    };

    return (
        <ExpensesContext.Provider
            value={{
                expenses: state.expenses,
                filteredExpenses,
                filteredYear: state.filteredYear,
                addExpense,
                deleteExpense,
                setFilteredYear,
                resetToDemo,
            }}
        >
            {children}
        </ExpensesContext.Provider>
    );
};

ExpensesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Хук для использования контекста
export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (context === undefined) {
        throw new Error('useExpenses must be used within an ExpensesProvider');
    }
    return context;
};
