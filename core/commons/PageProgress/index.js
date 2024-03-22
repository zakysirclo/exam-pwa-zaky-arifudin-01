import cx from 'classnames';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

const PageProgressLoader = () => {
    const [progress, setProgress] = useState();
    const [show, setShow] = useState(false);
    let timer = null;

    const wrapperClasses = cx('fixed', 'w-full', 'left-0', 'top-0', 'z-[1100]');

    const handleRouteChangeStart = () => {
        setProgress(0);
        setShow(true);
        timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                let newProgress;
                if (oldProgress + diff > 90) {
                    newProgress = 90;
                } else {
                    newProgress = oldProgress + diff;
                }

                return Math.min(newProgress, 90);
            });
        }, 500);
    };

    const handleRouteChangeComplete = () => {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('currentUrl', Router.asPath);
        }, 2000);
    };

    const handleRouteChangeError = () => {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
        }, 500);
    };

    useEffect(() => {
        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);
        Router.events.on('RouteChangeError', handleRouteChangeError);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            {show ? (
                <div className={cx(wrapperClasses)}>
                    <div className={cx('w-full', 'bg-neutral-50', 'h-1')}>
                        <div className={cx('bg-primary-700', 'h-1')} style={{ width: `${progress}%`, transition: '1s ease-in-out' }} />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default PageProgressLoader;
