/* eslint-disable radix */

import Dialog from '@common_dialog';
import ProductItem from '@plugin_productitem';

const WishlistComp = (props) => {
    const {
        wishlistItemId, t, handleRemove, storeConfig,
    } = props;
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistItemId });
        setOpenDelete(!openDelete);
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <>
            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(!openDelete)}
                title={t('customer:wishlist:warningDelete')}
                positiveAction={handleDelete}
                positiveLabel={t('common:button:yes')}
                negativeLabel={t('common:button:cancel')}
                negativeAction={() => setOpenDelete(!openDelete)}
            />
            <ProductItem
                isGrid
                usedInWishlist
                handlingRemove={() => setOpenDelete(!openDelete)}
                preloadImage={false}
                {...props}
            />
        </>
    );
};

export default WishlistComp;
