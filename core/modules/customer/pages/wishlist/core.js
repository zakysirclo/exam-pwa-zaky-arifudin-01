/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { getCartId, setCartId } from '@helper_cartid';
import { useQuery } from '@apollo/client';
import Router from 'next/router';
import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { getCartIdUser } from '@core_modules/customer/services/graphql/schema';
import {
    addSimpleProductsToCart, getCustomer, removeWishlist as gqlremoveWishlist, shareWishlist,
} from '@core_modules/customer/services/graphql';
import { basePath } from '@config';
import { getLoginInfo } from '@helper_auth';

const Wishlist = (props) => {
    let wishlist = [];
    const {
        Content, t, pageConfig, storeConfig,
    } = props;
    const config = {
        title: t('customer:wishlist:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:wishlist:pageTitle'),
        bottomNav: false,
        tagSelector: 'swift-page-wishlist',
    };

    const isLogin = getLoginInfo();

    const [addToCart] = addSimpleProductsToCart();
    const [removeWishlist] = gqlremoveWishlist();
    const { data, loading, refetch } = getCustomer(storeConfig);
    const [setShareWishlist, { loading: shareLoading }] = shareWishlist();

    const handleShareWishlist = async (emails, message) => {
        if (emails === '' || message === '') {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:wishlist:validateField'),
            });
            return 2;
        }
        const emailsToArray = emails.split(',');
        try {
            const res = await setShareWishlist({
                variables: {
                    emails: emailsToArray,
                    message,
                },
            });
            if (res) {
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:shareSuccess'),
                });
                return 1;
            }
        } catch (e) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('customer:wishlist:shareFailed'),
            });
            return -1;
        }

        return null;
    };
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        skip: !isLogin || typeof window === 'undefined',
    });

    if (data) {
        wishlist = data.customer.wishlist.items.map(({ id, product }) => ({
            ...product,
            wishlistItemId: id,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url || `${basePath}/assets/img/placeholder.png`,
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const handleToCart = ({
        sku, url_key, wishlistItemId, __typename,
    }) => {
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
            if (cartId === '' || !cartId) {
                const cartToken = cartUser.data.customerCart.id || '';
                cartId = cartToken;
                setCartId(cartToken);
            }
            addToCart({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(1),
                },
            })
                .then(() => {
                    removeWishlist({
                        variables: {
                            wishlistItemId,
                        },
                    }).then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'success',
                            text: t('customer:wishlist:successAddCart'),
                        });
                        refetch();
                    });
                })
                .catch(async (e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleRemove = ({ wishlistItemId }) => {
        window.backdropLoader(true);
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('customer:wishlist:removeFailed'),
                });
            });
    };

    const handleAddAlltoBag = async () => {
        window.backdropLoader(true);
        let totalSucces = 0;
        let errorCart = [false, ''];
        if (cartId === '' || !cartId) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
        await wishlist.map(async (item) => {
            addToCart({
                variables: {
                    cartId,
                    sku: item.sku,
                    qty: parseFloat(1),
                },
            })
                .then(async () => {
                    totalSucces += 1;
                    removeWishlist({
                        variables: {
                            wishlistItemId: item.wishlistItemId,
                        },
                    });
                })
                .catch((e) => {
                    errorCart = [true, e.message.split(':')[1]];
                });
        });
        setTimeout(async () => {
            refetch();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: errorCart[0]
                    ? totalSucces > 0
                        ? `${t('customer:wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t(
                            'customer:wishlist:addPartToBagSuccess',
                        ).split('$'[1])}`
                        : errorCart[1] || t('customer:wishlist:failedAddCart')
                    : t('customer:wishlist:addAllToBagSuccess'),
                variant: errorCart[0] ? 'error' : 'success',
            });
        }, 3000);
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    wishlist={wishlist}
                    refetch={refetch}
                    handleRemove={handleRemove}
                    handleToCart={handleToCart}
                    handleAddAlltoBag={handleAddAlltoBag}
                    loading={loading}
                    shareLoading={shareLoading}
                    handleShareWishlist={handleShareWishlist}
                    storeConfig={storeConfig}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default Wishlist;
