import Route from 'next/router';
import Summary from '@plugin_summary';
import dynamic from 'next/dynamic';
import { formatPrice } from '@helper_currency';
import { getCheckoutScv2Url } from '@core_modules/cart/services/graphql';
import { getCartId } from '@helper_cartid';
import Breadcrumb from '@common/Breadcrumb';
import Typography from '@common/Typography';
import Show from '@common/Show';
import EmptyView from '@core_modules/cart/pages/default/components/empty';
import ItemView from '@core_modules/cart/pages/default/components/item';
import useMediaQuery from '@hook/useMediaQuery';

const CrossSell = dynamic(() => import('@core_modules/cart/pages/default/components/crosssell'), { ssr: false });
const CrossSellView = dynamic(() => import('@core_modules/cart/pages/default/components/crosssell/view'), { ssr: false });
const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        dataCart,
        t,
        handleFeed,
        toggleEditMode,
        editMode,
        deleteItem,
        toggleEditDrawer,
        crosssell,
        errorCart,
        EditDrawerView,
        editItem,
        openEditDrawer,
        updateItem,
        SummaryView,
        PromoModalItemView,
        handleAddPromoItemToCart,
        applyCoupon,
        removeCoupon,
        storeConfig,
        dataSummary,
        loadingSummary,
        currencyCache,
        ...other
    } = props;
    const allData = !loadingSummary ? { ...dataCart, ...dataSummary } : null;
    const errorCartItems = dataCart?.errorItems?.length > 0;

    const {
        isDesktop,
    } = useMediaQuery();

    const cartId = getCartId();
    const [getScv2Url, { loading: loadingScv2Url }] = getCheckoutScv2Url();
    const handleOnCheckoutClicked = () => {
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = allData.prices.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;

        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount, currencyCache)}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
        } else if (storeConfig.pwacheckout?.enable === '1' && storeConfig.pwacheckout?.version === 'V2' && cartId) {
            getScv2Url({
                variables: {
                    cartId,
                },
            })
                .then((res) => {
                    window.location.replace(res.data.generateScv2Url.scv2_url);
                })
                .catch(() => {
                    window.toastMessage({
                        open: true,
                        text: t('common:cart:cartError'),
                        variant: 'error',
                    });
                });
        } else {
            Route.push('/checkout');
        }
    };

    const breadcrumbsData = [
        {
            label: t('cart:pageTitle'),
            link: '#',
            active: true,
            id: '',
        },
    ];

    return (
        <div className="flex flex-col cart-pages">
            <div className="xs:basis-full">
                <GimmickBanner data={dataCart.promoBanner || []} t={t} {...other} />
            </div>
            <div className="flex flex-col gap-6">
                <Breadcrumb iconHomeOnly data={breadcrumbsData} />
                <Typography variant="h1" className="swift-page-title text-lg tablet:text-[24px] destkop:text-[30px]">
                    {t('cart:pageTitle')}
                </Typography>
                <Show when={dataCart && dataCart.items && dataCart.items.length < 1}>
                    <div className="pt-4 pb-12 max-px-[75px] tablet:pt-9">
                        <EmptyView t={t} />
                    </div>
                </Show>
                <Show when={dataCart && dataCart.items && dataCart.items.length > 0}>
                    <div className="flex flex-col desktop:flex-row-reverse gap-6 tablet:gap-8 desktop:gap-10">
                        <div className="summary-cart w-full desktop:min-w-[370px] desktop:max-w-[370px]">
                            <Show when={!loadingSummary && allData}>
                                <Summary
                                    disabled={errorCartItems || (errorCart && errorCart.length > 0)}
                                    isDesktop
                                    hideButton={!isDesktop}
                                    t={t}
                                    dataCart={allData}
                                    editMode={editMode}
                                    storeConfig={storeConfig}
                                    {...other}
                                    loading={other.loading || loadingScv2Url}
                                    handleActionSummary={handleOnCheckoutClicked}
                                />
                            </Show>
                        </div>
                        <div className="content-cart w-full h-full">
                            <ItemView
                                data={dataCart}
                                t={t}
                                toggleEditMode={toggleEditMode}
                                editMode={editMode}
                                deleteItem={deleteItem}
                                handleFeed={handleFeed}
                                toggleEditDrawer={toggleEditDrawer}
                                storeConfig={storeConfig}
                                currencyCache={currencyCache}
                                updateItem={updateItem}
                            />
                        </div>
                    </div>
                </Show>
            </div>
            <CrossSell dataCart={dataCart} {...props} editMode={editMode} View={CrossSellView} />
        </div>
    );
};

export default Content;
