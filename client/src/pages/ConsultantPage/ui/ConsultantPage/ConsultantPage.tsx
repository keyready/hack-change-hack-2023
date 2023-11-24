import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect, useMemo } from 'react';
import { Disclosure } from 'shared/UI/Disclosure';
import classes from './ConsultantPage.module.scss';

interface ConsultantPageProps {
    className?: string;
}

const ConsultantPage = memo((props: ConsultantPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Входящие заявки';
    }, []);

    const titles = useMemo(() => ['Входящие заявки', 'Исходящие заявки'], []);
    const contents = useMemo(() => [<div>Входящие заявки</div>, <div>Исходящие заявки</div>], []);

    return (
        <Page className={classNames(classes.ConsultantPage, {}, [className])}>
            <h1>Страница консультанта</h1>

            <Disclosure titles={titles} contents={contents} />
        </Page>
    );
});

export default ConsultantPage;
