import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import ChartBar from './ChartBar';
import './Chart.css';

const Chart = ({ dataPoints }) => {
    // Используем useMemo для оптимизации вычислений
    const totalMaximum = useMemo(() => {
        const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value);
        return dataPointValues.length > 0 ? Math.max(...dataPointValues) : 0;
    }, [dataPoints]);

    return (
        <div
            className='chart'
            role='group'
            aria-label='Monthly expenses chart'
        >
            {dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMaximum}
                    label={dataPoint.label}
                />
            ))}
        </div>
    );
};

Chart.propTypes = {
    dataPoints: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(Chart);
