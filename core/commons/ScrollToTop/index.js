import Button from '@common_button';
import ArrowUp from '@heroicons/react/24/outline/ChevronUpIcon';
import cx from 'classnames';
import React from 'react';

const ScrollTop = ({ className = '' }) => {
    const [trigger, setTrigger] = React.useState(false);
    const maxHeightToShow = 200;

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkScrollTop = () => {
                if (!trigger && window.pageYOffset > maxHeightToShow) {
                    setTrigger(true);
                } else if (trigger && window.pageYOffset < maxHeightToShow) {
                    setTrigger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
            return () => window.removeEventListener('scroll', checkScrollTop);
        }
    }, [window, trigger]);

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Button
            onClick={scrollTop}
            className={cx(
                'z-scroll-to-top',
                'fixed',
                'bottom-0 right-0',
                'visible',
                'flex',
                'mb-4',
                'mr-4',
                '!P-0 w-10',
                'justify-center',
                { 'hidden invisible': !trigger },
                className,
            )}
            iconOnly
            icon={<ArrowUp />}
            variant="primary"
        />
    );
};

export default ScrollTop;
