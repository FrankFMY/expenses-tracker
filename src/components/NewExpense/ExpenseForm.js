import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './ExpenseForm.css';

const ExpenseForm = ({ onSaveExpenseData, onCancel }) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    // Состояние для ошибок валидации
    const [errors, setErrors] = useState({
        title: '',
        amount: '',
        date: '',
    });

    const titleChangeHandler = useCallback(
        (event) => {
            setEnteredTitle(event.target.value);
            // Сбрасываем ошибку при изменении поля
            if (errors.title) {
                setErrors((prev) => ({ ...prev, title: '' }));
            }
        },
        [errors.title]
    );

    const amountChangeHandler = useCallback(
        (event) => {
            setEnteredAmount(event.target.value);
            // Сбрасываем ошибку при изменении поля
            if (errors.amount) {
                setErrors((prev) => ({ ...prev, amount: '' }));
            }
        },
        [errors.amount]
    );

    const dateChangeHandler = useCallback(
        (event) => {
            setEnteredDate(event.target.value);
            // Сбрасываем ошибку при изменении поля
            if (errors.date) {
                setErrors((prev) => ({ ...prev, date: '' }));
            }
        },
        [errors.date]
    );

    const validateForm = useCallback(() => {
        let isValid = true;
        const newErrors = {
            title: '',
            amount: '',
            date: '',
        };

        // Валидация заголовка
        if (!enteredTitle.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        } else if (enteredTitle.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
            isValid = false;
        }

        // Валидация суммы
        if (!enteredAmount || enteredAmount === '') {
            newErrors.amount = 'Amount is required';
            isValid = false;
        } else if (isNaN(enteredAmount) || parseFloat(enteredAmount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
            isValid = false;
        }

        // Валидация даты
        if (!enteredDate) {
            newErrors.date = 'Date is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [enteredTitle, enteredAmount, enteredDate]);

    const submitHandler = useCallback(
        (event) => {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            const expenseData = {
                title: enteredTitle,
                amount: +enteredAmount,
                date: new Date(enteredDate),
            };

            onSaveExpenseData(expenseData);

            // Сброс формы
            setEnteredTitle('');
            setEnteredAmount('');
            setEnteredDate('');
            setErrors({
                title: '',
                amount: '',
                date: '',
            });
        },
        [
            enteredTitle,
            enteredAmount,
            enteredDate,
            onSaveExpenseData,
            validateForm,
        ]
    );

    // Получаем текущую дату для ограничения максимальной даты
    const today = new Date();
    const maxDate = format(today, 'yyyy-MM-dd');

    // Минимальная дата (например, 4 года назад)
    const minDate = format(
        new Date(today.getFullYear() - 4, 0, 1),
        'yyyy-MM-dd'
    );

    return (
        <form
            onSubmit={submitHandler}
            className='expense-form'
        >
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                        aria-invalid={!!errors.title}
                        aria-describedby={
                            errors.title ? 'title-error' : undefined
                        }
                    />
                    {errors.title && (
                        <p
                            id='title-error'
                            className='error-text'
                        >
                            {errors.title}
                        </p>
                    )}
                </div>

                <div className='new-expense__control'>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        id='amount'
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={enteredAmount}
                        onChange={amountChangeHandler}
                        aria-invalid={!!errors.amount}
                        aria-describedby={
                            errors.amount ? 'amount-error' : undefined
                        }
                    />
                    {errors.amount && (
                        <p
                            id='amount-error'
                            className='error-text'
                        >
                            {errors.amount}
                        </p>
                    )}
                </div>

                <div className='new-expense__control'>
                    <label htmlFor='date'>Date</label>
                    <input
                        id='date'
                        type='date'
                        min={minDate}
                        max={maxDate}
                        value={enteredDate}
                        onChange={dateChangeHandler}
                        aria-invalid={!!errors.date}
                        aria-describedby={
                            errors.date ? 'date-error' : undefined
                        }
                    />
                    {errors.date && (
                        <p
                            id='date-error'
                            className='error-text'
                        >
                            {errors.date}
                        </p>
                    )}
                </div>
            </div>

            <div className='new-expense__actions'>
                <button
                    type='button'
                    onClick={onCancel}
                    className='button button--alt'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='button'
                >
                    Add Expense
                </button>
            </div>
        </form>
    );
};

ExpenseForm.propTypes = {
    onSaveExpenseData: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpenseForm);
