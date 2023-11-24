import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import ActiveCircleIcon from 'shared/assets/icons/active-circle.svg';
import DisabledCircleIcon from 'shared/assets/icons/disabled-circle.svg';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Disclosure as HDisclosure, Transition } from '@headlessui/react';
import { Icon } from 'shared/UI/Icon/Icon';
import { HStack, VStack } from 'shared/UI/Stack';
import classes from './Disclosure.module.scss';

interface DisclosureProps {
    className?: string;
    title: string;
    isNewRequests: boolean;
    content: ReactNode;
    type?: number;
    defaultOpened?: boolean;
}

export const Disclosure = memo((props: DisclosureProps) => {
    const { content, title, isNewRequests, type = 1, defaultOpened } = props;

    return (
        <HDisclosure as={VStack} maxW defaultOpen={defaultOpened}>
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

                    <Transition
                        enter={classes.enter}
                        enterFrom={classes.enterFrom}
                        enterTo={classes.enterTo}
                        leave={classes.leave}
                        leaveFrom={classes.leaveFrom}
                        leaveTo={classes.leaveTo}
                    >
                        <HDisclosure.Panel className={classes.content}>{content}</HDisclosure.Panel>
                    </Transition>
                </>
            )}
        </HDisclosure>
    );
});
