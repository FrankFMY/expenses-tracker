import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './ExpensesFilter.css';

const ExpensesFilter = ({ selected, onChangeFilter, onReset }) => {
    const dropdownChangeHandler = (event) => {
        onChangeFilter(event.target.value);
    };

    // Получаем текущий год для динамического создания опций
    const currentYear = new Date().getFullYear();
    const years = [];

    // Создаем массив годов от текущего до текущего-3
    for (let i = 0; i < 4; i++) {
        years.push(currentYear - i);
    }

    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <div className='filter-label-group'>
                    <label htmlFor='year-filter'>Filter by year</label>
                    <button
                        className='reset-button'
                        onClick={onReset}
                        title='Сбросить до демо-данных'
                        aria-label='Сбросить до демо-данных'
                    >
                        ↺
                    </button>
                </div>
                <select
                    id='year-filter'
                    value={selected}
                    onChange={dropdownChangeHandler}
                    aria-label='Filter expenses by year'
                >
                    {years.map((year) => (
                        <option
                            key={year}
                            value={year.toString()}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

ExpensesFilter.propTypes = {
    selected: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpensesFilter);
