import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { PieChart } from 'widgets/PieChart';
import classes from './UnderwriterPieChart.module.scss';

interface UnderwriterPieChartProps {
    className?: string;
}

export const UnderwriterPieChart = memo((props: UnderwriterPieChartProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.UnderwriterPieChart, {}, [className])}>
            <PieChart />
        </div>
    );
});
