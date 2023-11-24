import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import ActiveCircleIcon from 'shared/assets/icons/active-circle.svg';
import DisabledCircleIcon from 'shared/assets/icons/disabled-circle.svg';
import ExpandArrowIcon from 'shared/assets/icons/expand_arrow.svg';
import { CaretDownIcon, CircleIcon } from '@radix-ui/react-icons';
import { Disclosure as HDisclosure } from '@headlessui/react';
import { Icon } from 'shared/UI/Icon/Icon';
import { HStack, VStack } from 'shared/UI/Stack';
import classes from './Disclosure.module.scss';

interface DisclosureProps {
    className?: string;
    title: string;
    isNewRequests: boolean;
    content: ReactNode;
    type?: number;
}

export const Disclosure = memo((props: DisclosureProps) => {
    const { className, content, title, isNewRequests, type = 1 } = props;

    return (
        <HDisclosure as={VStack} maxW>
            {({ open }) => (
                <>
                    <HDisclosure.Button
                        className={classNames(classes.header, {
                            [classes.blue]: type === 2,
                            [classes.green]: type === 3,
                            [classes.red]: type === 4,
                        })}
                    >
                        <HStack maxW justify="between">
                            <HStack maxW justify="start" gap="8">
                                <CaretDownIcon
                                    className={classNames(classes.arrow, {
                                        [classes.openedIcon]: open,
                                        [classes.arrowInverted]: type !== 1,
                                    })}
                                />
                                <h3 className={classes.title}>{title}</h3>
                            </HStack>
                            {isNewRequests && (
                                <Icon
                                    className={classes.circle}
                                    Svg={type !== 1 ? DisabledCircleIcon : ActiveCircleIcon}
                                />
                            )}
                        </HStack>
                    </HDisclosure.Button>
                    <HDisclosure.Panel className={classes.content}>{content}</HDisclosure.Panel>
                </>
            )}
        </HDisclosure>
    );
});
