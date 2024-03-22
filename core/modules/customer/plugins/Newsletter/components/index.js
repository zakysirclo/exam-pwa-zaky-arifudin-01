import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';

import React from 'react';

import cx from 'classnames';

const NewsletterView = (props) => {
    // base props
    const {
        formik, loading, t, type, storeConfig, ...others
    } = props;

    // magezon newsletter props
    const {
        form_height,
        title_color,
        form_width,
        isCms = false,
        show_firstname,
        show_lastname,
        layout_type,
        description,
        title,
        title_font_size,
        button_background_color,
        button_border_color,
        button_border_radius = 0,
        button_border_style,
        button_border_width,
        button_color,
        button_hover_background_color,
        button_hover_border_color,
        button_hover_color,
        title_spacing,
    } = others;

    const [totalHeight, setTotalHeight] = React.useState(0);

    React.useEffect(() => {
        if (totalHeight === 0) {
            let total = 0;
            if (show_firstname && show_lastname) {
                total = form_height ? Number(form_height) * 3 + 230 : 20 * 3 + 230;
                setTotalHeight(total);
            } else if (!show_firstname && !show_lastname) {
                total = form_height ? Number(form_height) + 230 : 10 + 200;
                setTotalHeight(total);
            } else {
                total = form_height ? Number(form_height) * 2 + 230 : 10 * 2 + 220;
                setTotalHeight(total);
            }
        }
    }, [totalHeight]);
    /* eslint-disable */

    return (
        <div>
            <div className={cx('relative', 'h-full', 'border-y-[1px]', 'border-neutral-200')}>
                <div
                    className={cx(
                        'relative',
                        'tablet:max-desktop:max-w-screen-tablet desktop:max-w-screen-desktop m-[0_auto]',
                        'tablet:flex',
                        'tablet:flex-row',
                        'tablet:justify-between',
                        'tablet:py-6',
                        'max-tablet:px-4',
                        'max-tablet:py-6',
                        'tablet:px-0',
                    )}
                >
                    <div className={cx('left-section-newsletter', 'max-tablet:grid', 'max-tablet:grid-cols-1')}>
                        {type === 'pwa-newsletter-subscribe' ? null : (
                            <div
                                className={cx(
                                    'text-lg',
                                    'font-semibold',
                                    'leading-6',
                                    'tracking-[-0.04px]',
                                    'title',
                                    'max-tablet:text-center',
                                    'tablet:text-left',
                                )}
                            >
                                {isCms && title ? title : t('common:newsletter:title')}
                            </div>
                        )}
                        {isCms && description ? (
                            <div className={cx('tablet:text-left', 'max-tablet:text-center')}>
                                <p className={cx('text-base', 'leading-5', 'font-normal')}>{description}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className={cx('right-section-newsletter')}>
                        <div className="block-newsletter">
                            <div className="content">
                                <form
                                    className={cx(
                                        'tablet:flex',
                                        'tablet:w-full',
                                        'tablet:justify-start',
                                        'tablet:items-start',
                                        'max-tablet:grid',
                                        'max-tablet:grid-cols-1',
                                        'max-tablet:mt-6',
                                    )}
                                    id="newsletter-validate-detail"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <TextField
                                        className={cx('max-tablet:w-full', 'tablet:max-desktop:w-[247px]', 'h-[44px]')}
                                        value={formik.values.email}
                                        id="email"
                                        name="email"
                                        placeholder={t('common:newsletter:placeholder')}
                                        onChange={formik.handleChange}
                                        hintProps={{
                                            displayHintText: !!(formik.touched.email && formik.errors.email),
                                            hintType: 'error',
                                            hintText: (formik.touched.email && formik.errors.email) || null,
                                        }}
                                    />
                                    <Button
                                        className={cx('py-[10px]', 'tablet:ml-2', 'max-tablet:mt-4', 'max-tablet:w-full', 'max-tablet:text-center')}
                                        variant="primary"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={() =>
                                            formik.values.email === ''
                                                ? window.toastMessage({
                                                      open: true,
                                                      variant: 'error',
                                                      text: t('common:newsletter:emptyValue'),
                                                  })
                                                : formik.handleSubmit()
                                        }
                                    >
                                        <Typography className={cx('!text-neutral-white', 'max-tablet:m-[0_auto]')}>Subscribe</Typography>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .newsletter-container {
                        position: relative;
                        // margin-bottom: -40px;
                        height: ${layout_type === 'box'
                            ? `${title_font_size ? Number(title_font_size) + totalHeight + 40 : totalHeight}px`
                            : title_font_size
                              ? `${170 + Number(title_font_size) + 20}px`
                              : '170px'};
                    }
                    .wrapper {
                        position: absolute;
                        width: 100%;
                        top: 45%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .title {
                        font-size: ${isCms && title_font_size ? `${title_font_size}px` : '20px'};
                        color: ${title_color ? title_color : 'black'};
                    }
                    .title h3 {
                        font-weight: 600;
                        letter-spacing: ${title_spacing && isCms ? title_spacing : '0.72'}px;
                    }
                    .block-newsletter {
                        margin: 0 auto;
                        max-width: ${layout_type === 'box' ? '100%' : '100%'};
                    }
                    .form.subscribe {
                        flex-direction: ${layout_type === 'box' ? 'column' : 'row'};
                    }
                    .actions {
                        display: table-cell;
                        vertical-align: top;
                    }
                    .field-newsletter {
                        margin-left: 10px;
                    }
                    .field-newsletter input {
                        background: #fff;
                        background-clip: padding-box;
                        border: 1px solid silver;
                        border-radius: 0;
                        font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size: 13px;
                        height: ${form_height ? `${form_height}px` : '40px'};
                        line-height: 1.42857143;
                        padding: 14px 13px;
                        vertical-align: baseline;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 20px 0;
                        min-width: ${layout_type === 'box' ? `${form_width}px` : '200px'};
                        margin-bottom: ${layout_type === 'box' ? '10px' : '0px'};
                    }
                    .action.subscribe {
                        background: ${isCms ? button_background_color : '#000'};
                        border: ${isCms ? `${button_border_width}px ${button_border_style} ${button_border_color}` : '#000'};
                        font-weight: bold;
                        width: ${layout_type === 'box' ? `${form_width}px` : '120px'};
                        text-transform: uppercase;
                        padding: 11px 15px;
                        height: ${form_height ? `${form_height}px` : '40px'};
                        margin-left: 10px;
                        white-space: nowrap;
                        color: ${isCms ? button_color : '#fff'};
                        border-radius: ${isCms ? `${button_border_radius}px` : '20px'};
                        cursor: pointer;
                    }
                    .action.subscribe:hover {
                        background-color: ${isCms ? button_hover_background_color : ''};
                        border-color: ${isCms ? button_hover_border_color : ''};
                        color: ${isCms ? button_hover_color : ''};
                    }
                    @media screen and (max-width: 767px) {
                        .newsletter-container {
                            background: #fff;
                            height: ${layout_type === 'box' ? `${totalHeight}px` : isCms ? (form_height ? `${totalHeight}px` : '55vh') : '170px'};
                        }
                        .wrapper {
                            top: 50%;
                        }
                        .block-newsletter {
                            max-width: 100%;
                        }
                        .actions {
                            display: block;
                            margin-top: 20px;
                        }
                        .action.subscribe {
                            width: 100%;
                            margin-left: 10px;
                        }
                        .form.subscribe {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            margin-top: 20px;
                            justify-content: center;
                            align-items: center;
                        }
                        .field-newsletter {
                            margin-bottom: 10px;
                        }
                        .field-newsletter input {
                            background: #fff;
                            background-clip: padding-box;
                            border: 1px solid silver;
                            border-radius: 0;
                            font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            font-size: 13px;
                            height: 40px;
                            line-height: 1.42857143;
                            padding: 14px 13px;
                            vertical-align: baseline;
                            width: 100%;
                            box-sizing: border-box;
                            padding: 0 20px 0;
                            min-width: 300px;
                        }
                        .action.subscribe {
                            background: ${isCms ? '' : '#000'};
                            border: #000;
                            font-weight: bold;
                            width: 300px;
                            text-transform: uppercase;
                            height: 40px;
                            white-space: nowrap;
                            color: #fff;
                            border-radius: 20px;
                            cursor: pointer;
                        }
                    }
                    .description {
                        margin-top: 10px;
                        margin-bottom: 10px;
                        text-align: left;
                        margin-left: 10px;
                    }
                    .error-validation {
                        text-align: left;
                        font-weight: 300;
                        font-size: 10px;
                        color: #ff0000;
                        margin: 5px;
                        margin-bottom: -20px;
                    }
                `}
            </style>
        </div>
    );
    /* eslint-enable */
};

export default NewsletterView;
