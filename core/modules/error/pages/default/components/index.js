import Router from 'next/router';
import cx from 'classnames';
import Button from '@common_button';
import Typography from '@common_typography';

const ErrorContent = (props) => {
    const { statusCode, title } = props;

    return (
        <div
            className={cx(
                'px-4 flex flex-col items-center justify-center',
                'min-h-[calc(100vh-21rem)]',
            )}
        >
            <div
                className={cx(
                    'flex items-center justify-center',
                )}
            >
                {statusCode ? (
                    <Typography
                        variant="h1"
                        className={cx(
                            'pr-4 border-r-[1px] border-neutral-200',
                        )}
                    >
                        {statusCode}
                    </Typography>
                ) : null}
                <Typography
                    variant="p"
                    className={cx(
                        statusCode && 'pl-4',
                    )}
                >
                    {title}
                </Typography>
            </div>
            {statusCode === 404 ? (
                <div className="mt-[40px] flex justify-center">
                    <Button onClick={() => { Router.push('/'); }}>
                        <Typography className={cx('!text-neutral-white')}>Back</Typography>
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default ErrorContent;
