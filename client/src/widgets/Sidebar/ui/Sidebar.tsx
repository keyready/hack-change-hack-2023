import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import classes from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={classNames(
                classes.Sidebar,
                {
                    [classes.active]: isHovered,
                },
                [className],
            )}
        >
            <h4>сайдбар</h4>
        </div>
    );
});
