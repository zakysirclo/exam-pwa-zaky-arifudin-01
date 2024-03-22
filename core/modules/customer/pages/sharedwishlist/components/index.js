/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import ProductItem from '@plugin_productitem';
import Button from '@common_button';
import Typography from '@common_typography';

const Content = (props) => {
    const {
        wishlistItem, t, handleToCart, handleAddAlltoBag, SharedSkeleton,
    } = props;
    /* eslint-disable */
    const handleAddToCart = (item) => {
        handleToCart({
            sku: item.product.sku,
            url_key: item.product.url_key,
            __typename: item.product.__typename,
        });
    }

    const setHandleAddAlltoBag = () => {
        const items = [];
        if (wishlistItem && wishlistItem.customerWishlist
            && wishlistItem.customerWishlist.items.length > 0) {
            wishlistItem.customerWishlist.items.map((item) => {
                const data = {
                    sku: item.product.sku,
                    qty: item.qty,
                    wishlistItemId: item.id,
                };
                items.push(data);
                return null;
            });
        }
        if (items.length > 0) {
            handleAddAlltoBag(items);
        }
    };

    if (!wishlistItem) {
        return <SharedSkeleton t={t} />;
    }

    return null;
    // return (
    //     <div className={styles.container}>
    //         <div className={styles.titleContainer}>
    //             <Typography variant="h6" type="bold" letter="uppercase">
    //                 {wishlistItem && wishlistItem.customerWishlist && wishlistItem.customerWishlist.name}
    //             </Typography>
    //         </div>
    //         <TableContainer component={Paper} className={styles.tableContainer}>
    //             {
    //                 wishlistItem && wishlistItem.customerWishlist
    //                 && wishlistItem.customerWishlist.items.length > 0
    //                 && (
    //                     <Table className={styles.table} aria-label="a dense table">
    //                         <TableHead>
    //                             <TableRow className={styles.tableRowHead}>
    //                                 <TableCell align="left">
    //                                     <Typography variant="span" type="bold" letter="uppercase">
    //                                         {t('customer:wishlist:product')}
    //                                     </Typography>
    //                                 </TableCell>
    //                                 <TableCell align="left">
    //                                     <Typography variant="span" type="bold" letter="uppercase">
    //                                         {t('customer:wishlist:addToCart')}
    //                                     </Typography>
    //                                 </TableCell>
    //                             </TableRow>
    //                         </TableHead>
    //                         <TableBody>
    //                             <>
    //                                 {
    //                                     wishlistItem.customerWishlist.items.map((item, index) => (
    //                                         <>
    //                                             <TableRow key={index} className={styles.tableRowResponsive}>
    //                                                 <TableCell
    //                                                     className={styles.tableCellResponsiveProduct}
    //                                                     align="left"
    //                                                     data-th={t('customer:wishlist:product')}
    //                                                 >
    //                                                     <div className={styles.productItem}>
    //                                                         <ProductItem {...item.product} enableQuickView={false} />
    //                                                     </div>
    //                                                 </TableCell>
    //                                                 {
    //                                                     !isMobile ? (
    //                                                         <TableCell
    //                                                             className={styles.tableCellResponsive}
    //                                                             align="left"
    //                                                             data-th={t('customer:wishlist:addToCart')}
    //                                                         >
    //                                                             <div className={styles.productAction}>
    //                                                                 <div>
    //                                                                     <Button
    //                                                                         onClick={() => handleAddToCart(item)}
    //                                                                         disabled={false}
    //                                                                         className={styles.btnWishlist}
    //                                                                         align="left"
    //                                                                     >
    //                                                                         <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                                                                             {t('customer:wishlist:addToCart')}
    //                                                                         </Typography>
    //                                                                     </Button>
    //                                                                 </div>
    //                                                             </div>
    //                                                         </TableCell>
    //                                                     ) : null
    //                                                 }
    //                                             </TableRow>
    //                                             {
    //                                                 isMobile ? (
    //                                                     <div>
    //                                                         <Button
    //                                                             onClick={() => handleAddToCart(item)}
    //                                                             disabled={false}
    //                                                             className={styles.btnWishlistMobile}
    //                                                             align="left"
    //                                                         >
    //                                                             <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                                                                 {t('customer:wishlist:addToCart')}
    //                                                             </Typography>
    //                                                         </Button>
    //                                                     </div>
    //                                                 ) : null
    //                                             }
    //                                         </>
    //                                     ))
    //                                 }
    //                             </>
    //                         </TableBody>
    //                     </Table>
    //                 )
    //             }
    //         </TableContainer>
    //         <div className={styles.footerWishlist}>
    //             {
    //                 isMobile
    //                     ? (
    //                         <Button
    //                             onClick={setHandleAddAlltoBag}
    //                             disabled={false}
    //                             className={styles.btnWishlistAddAll}
    //                             align="center"
    //                         >
    //                             <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                                 {t('customer:wishlist:addAllToBag')}
    //                             </Typography>
    //                         </Button>
    //                     )
    //                     : (
    //                         <Button
    //                             onClick={setHandleAddAlltoBag}
    //                             disabled={false}
    //                             className={styles.btnWishlistAddAll}
    //                             align="left"
    //                         >
    //                             <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                                 {t('customer:wishlist:addAllToBag')}
    //                             </Typography>
    //                         </Button>
    //                     )
    //             }
    //         </div>
    //     </div>
    // );
};

export default Content;
