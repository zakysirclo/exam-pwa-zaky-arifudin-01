/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
import OptionItemAction from '@core_modules/product/plugins/OptionItemAction';
import CheckBox from '@common/Forms/CheckBox';
import Typography from '@common_typography';
import Divider from '@common_divider';
import Show from '@common_show';
import Button from '@common_button';
import { formatPrice } from '@helper_currency';

const DownloadView = (props) => {
    const {
        t,
        items,
        linksTitle,
        downloadProductSamples,
        handleOptionDownloadable,
        handleOptionAll,
        disabled,
        loading,
        showQty = true,
        qty,
        setQty,
        handleAddToCart,
        showAddToCart = true,
        CustomFooter,
        currencyCode,
        currencyCache,
        isPlp,
        ...other
    } = props;
    const setLoading = !(loading === 0 || loading === false);
    return (
        <>
            <div className="options-container">
                <Show when={!isPlp && items && items.length > 0}>
                    <Show when={linksTitle}>
                        <Typography variant="bd-2" className="mb-[12px] block">{linksTitle}</Typography>
                    </Show>
                    {
                        items.map(
                            (val, key) => (
                                <div
                                    key={`checkbox-${key}`}
                                    className="checkbox-container mb-[14px]"
                                >
                                    <CheckBox
                                        variant="single"
                                        key={`checkbox-${key}`}
                                        disabled={disabled}
                                        id={val.id}
                                        name={val.id}
                                        value={val.id}
                                        defaultChecked={val.is_default}
                                        onClick={() => !disabled && handleOptionDownloadable(val.id, val.price)}
                                        classNames={{
                                            checkboxClasses: 'w-[16px] h-[16px]',
                                            checkboxContainerClasses: 'flex',
                                        }}
                                    >
                                        <div className="option-downloadable-item flex justify-between w-[100%]">
                                            <Typography variant="bd-2b">
                                                {`${val.title} + `}
                                                <b>{`${formatPrice(val.price, currencyCode, currencyCache)}`}</b>
                                            </Typography>
                                            <Show when={val?.sample_url}>
                                                <Button
                                                    link={val.sample_url}
                                                    linkTarget="_blank"
                                                    variant="plain"
                                                    className="!p-0"
                                                >
                                                    <Typography variant="bd-2b" className="underline">
                                                        {t('common:label:viewSample')}
                                                    </Typography>
                                                </Button>
                                            </Show>
                                        </div>
                                    </CheckBox>
                                </div>
                            ),
                        )
                    }
                    <Divider className="mt-[24px] mb-[8px]" />
                </Show>
            </div>
            {
                React.isValidElement(CustomFooter)
                    ? React.cloneElement(CustomFooter, {
                        ...other,
                        loading: setLoading,
                        disabled,
                        showQty,
                        handleAddToCart,
                        qty,
                        setQty,
                        t,
                        showAddToCart,
                    })
                    : (
                        <OptionItemAction
                            loading={setLoading}
                            disabled={disabled}
                            showQty={showQty}
                            handleAddToCart={handleAddToCart}
                            qty={qty}
                            setQty={setQty}
                            t={t}
                            showAddToCart={showAddToCart}
                            CustomFooter={(
                                <Show when={downloadProductSamples.length > 0}>
                                    <div className="option-footer-downloadable flex flex-col mt-[12px]">
                                        <Typography variant="bd-2" className="mb-[6px] mt-[12px]">{t('common:label:trailer')}</Typography>
                                        {
                                            downloadProductSamples.map((item, index) => (
                                                <Button
                                                    link={item.sample_url}
                                                    linkTarget="_blank"
                                                    variant="plain"
                                                    className="!p-0 my-[6px]"
                                                    key={`trailer-${index}`}
                                                >
                                                    <Typography variant="bd-2b" className="underline" color="text-neutral-500">
                                                        {item.title}
                                                    </Typography>
                                                </Button>
                                            ))
                                        }
                                    </div>
                                </Show>
                            )}
                            {...other}
                        />
                    )
            }
        </>
    );
};

export default DownloadView;
