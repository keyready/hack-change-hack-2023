import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import classes from './Disclosure.module.scss';

interface DisclosureProps {
    className?: string;
    titles: string[];
    contents: ReactNode[];
}

export const Disclosure = memo((props: DisclosureProps) => {
    const { className, contents, titles } = props;

    return (
        <Accordion activeIndex={0} className={classNames(classes.Disclosure, {}, [className])}>
            {titles.map((title, index) => (
                <AccordionTab header={title} key={index}>
                    {contents[index]}
                </AccordionTab>
            ))}
        </Accordion>
    );
});
