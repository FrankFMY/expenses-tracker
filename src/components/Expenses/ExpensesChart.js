import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';

const ExpensesChart = ({ expenses }) => {
    // Используем useMemo для оптимизации вычислений
    const chartDataPoints = useMemo(() => {
        const dataPoints = [
            { label: 'Jan', value: 0 },
            { label: 'Feb', value: 0 },
            { label: 'Mar', value: 0 },
            { label: 'Apr', value: 0 },
            { label: 'May', value: 0 },
            { label: 'Jun', value: 0 },
            { label: 'Jul', value: 0 },
            { label: 'Aug', value: 0 },
            { label: 'Sep', value: 0 },
            { label: 'Oct', value: 0 },
            { label: 'Nov', value: 0 },
            { label: 'Dec', value: 0 },
        ];

        for (const expense of expenses) {
            const expenseMonth = expense.date.getMonth();
            dataPoints[expenseMonth].value += expense.amount;
        }

        return dataPoints;
    }, [expenses]);

    return <Chart dataPoints={chartDataPoints} />;
};

ExpensesChart.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ExpensesChart);
