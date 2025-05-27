import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './ChartBar.css';

const ChartBar = ({ value, maxValue, label }) => {
    // Используем useMemo для оптимизации вычислений
    const barFillHeight = useMemo(() => {
        if (maxValue > 0) {
            return Math.round((value / maxValue) * 100) + '%';
        }
        return '0%';
    }, [value, maxValue]);

    return (
        <div className='chart-bar'>
            <div
                className='chart-bar__inner'
                role='progressbar'
                aria-valuenow={value}
                aria-valuemin='0'
                aria-valuemax={maxValue}
                aria-label={`${label}: ${value}`}
            >
                <div
                    className='chart-bar__fill'
                    style={{ height: barFillHeight }}
                ></div>
            </div>
            <div className='chart-bar__label'>{label}</div>
        </div>
    );
};

ChartBar.propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

// Используем memo для предотвращения ненужных ререндеров
export default memo(ChartBar);
