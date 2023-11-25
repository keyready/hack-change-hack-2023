import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import classes from './PieChart.module.scss';

interface PieChartProps {
    className?: string;
}

export const PieChart = memo((props: PieChartProps) => {
    const { className } = props;

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Активные', 'Принятые', 'Отклоненные'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#A0E720', '#0087CD', '#F06'],
                    hoverBackgroundColor: ['#A0E730', '#0087F0', '#F09'],
                },
            ],
        };
        const options = {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 16,
                        },
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        // <div className={classes.PieChartWrapper}>
        <Chart width="400px" type="doughnut" data={chartData} options={chartOptions} />
        // </div>
    );
});
