/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import React from 'react';
import Typography from '@common_typography';
import Link from 'next/link';
import classNames from 'classnames';
import Image from '@common_image';
import { formatPrice } from '@helper_currency';
import { SkeletonTable } from '@core_modules/paypal/pages/review/components/Skeleton';

const ListItemCart = (props) => {
    const { t, checkout, storeConfig } = props;
    let data = [];
    if (checkout.cart && checkout.cart.items && checkout.cart.items.length > 0) {
        data = checkout.cart.items;
    }

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 10);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 10);
    return null;
    // return (
    //     <div className={classNames('flex flex-row', styles.containerItem)}>
    //         <div className={classNames('xs:basis-full', styles.labelTitle)}>
    //             <Typography variant="h5">
    //                 {t('checkout:paypal:itemsCart')}
    //             </Typography>
    //             <Link href="/checkout/cart">

    //                 <Typography variant="span">
    //                     {t('checkout:paypal:editCart')}
    //                 </Typography>

    //             </Link>
    //         </div>
    //         <div className="xs:basis-full">
    //             {
    //                 checkout.loading.all ? (<SkeletonTable />) : (
    //                     <TableContainer component={Paper} className={styles.tableContainer}>
    //                         <Table className={styles.table} size="small" aria-label="a dense table">
    //                             <TableHead>
    //                                 <TableRow className={styles.tableRowHead}>
    //                                     <TableCell align="left" colSpan={2}>
    //                                         <Typography variant="span" type="bold">
    //                                             Item
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell align="right">
    //                                         <Typography variant="span" type="bold">
    //                                             {t('common:title:price')}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell align="right">
    //                                         <Typography variant="span" type="bold">
    //                                             {t('common:title:shortQty')}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell align="right">
    //                                         <Typography variant="span" type="bold">
    //                                             {t('common:subtotal')}
    //                                         </Typography>
    //                                     </TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {data && data.length > 0 && (
    //                                     <>
    //                                         {
    //                                             data.map((val, index) => (
    //                                                 <TableRow key={index} className={styles.tableRowResponsive}>
    //                                                     <TableCell
    //                                                         align="center"
    //                                                     >
    //                                                         <div className={styles.productImgContainer}>
    //                                                             <Link
    //                                                                 href="/[...slug]"
    //                                                                 as={`/${val.product.url_key}`}
    //                                                             >

    //                                                                 <Image
    //                                                                     src={val.product.small_image.url}
    //                                                                     className={styles.productImg}
    //                                                                     alt={val.product.name}
    //                                                                     width={defaultWidth}
    //                                                                     height={defaultHeight}
    //                                                                     quality={80}
    //                                                                     storeConfig={storeConfig}
    //                                                                 />

    //                                                             </Link>
    //                                                             {
    //                                                                 val.prices.price.value === 0 ? (
    //                                                                     <span>Free</span>
    //                                                                 ) : null
    //                                                             }
    //                                                         </div>
    //                                                     </TableCell>
    //                                                     <TableCell
    //                                                         align="left"
    //                                                         className={styles.noBorder}
    //                                                     >
    //                                                         <div className="flex flex-row">
    //                                                             <div className="xs:basis-full">
    //                                                                 <Link
    //                                                                     href="/[...slug]"
    //                                                                     as={`/${val.product.url_key}`}
    //                                                                 >

    //                                                                     <Typography variant="span" letter="capitalize">
    //                                                                         {val.product.name}
    //                                                                     </Typography>

    //                                                                 </Link>
    //                                                             </div>
    //                                                             <div className="xs:basis-full flex flex-col">
    //                                                                 { val.configurable_options ? val.configurable_options.map((item, idx) => (
    //                                                                     <Typography variant="span" letter="capitalize" key={idx}>
    //                                                                         <strong>{item.option_label}</strong>
    //                                                                         {' '}
    //                                                                         :
    //                                                                         {' '}
    //                                                                         {item.value_label}
    //                                                                     </Typography>
    //                                                                 )) : null}
    //                                                             </div>
    //                                                             {
    //                                                                 val.links && val.links.length > 0 && (
    //                                                                     <div className="xs:basis-full row option-link">
    //                                                                         <Typography variant="span" letter="capitalize" type="bold">
    //                                                                             Downloads :
    //                                                                             {' '}
    //                                                                         </Typography>
    //                                                                         <div className="flex flex-col">
    //                                                                             { val.links.map((item, idx) => (
    //                                                                                 <Typography variant="span" letter="capitalize" key={idx}>
    //                                                                                     {item.title}
    //                                                                                 </Typography>
    //                                                                             )) }
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 )
    //                                                             }
    //                                                         </div>
    //                                                         {val.bundle_options && val.bundle_options.length ? (
    //                                                             <div className="product-options">
    //                                                                 {val.bundle_options.map((value, idx) => (
    //                                                                     <div className="option-wrapper" key={idx}>
    //                                                                         <strong>{value.label}</strong>
    //                                                                         {' '}
    //                                                                         :
    //                                                                         <div className="option-wrapper__item">
    //                                                                             {value.values.map((item, idt) => (
    //                                                                                 <div key={idt}>
    //                                                                                     {item.quantity}
    //                                                                                     {' '}
    //                                                                                     x
    //                                                                                     {item.label}
    //                                                                                     {' '}
    //                                                                                     <strong>
    //                                                                                         + $
    //                                                                                         {item.price}
    //                                                                                     </strong>
    //                                                                                 </div>
    //                                                                             ))}
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 ))}
    //                                                             </div>
    //                                                         ) : null}
    //                                                         {val.bundle_options && val.bundle_options.length ? (
    //                                                             <div className="product-options">
    //                                                                 {val.bundle_options.map((bundle, idb) => (
    //                                                                     <div className="option-wrapper" key={idb}>
    //                                                                         <strong>{bundle.label}</strong>
    //                                                                         {' '}
    //                                                                         :
    //                                                                         <div className="option-wrapper__item">
    //                                                                             {bundle.values.map((item, idt) => (
    //                                                                                 <div key={idt}>
    //                                                                                     {item.quantity}
    //                                                                                     {' '}
    //                                                                                     x
    //                                                                                     {item.label}
    //                                                                                     {' '}
    //                                                                                     <strong>
    //                                                                                         + $
    //                                                                                         {item.price}
    //                                                                                     </strong>
    //                                                                                 </div>
    //                                                                             ))}
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 ))}
    //                                                             </div>
    //                                                         ) : null}
    //                                                         {val.customizable_options && val.customizable_options.length ? (
    //                                                             <div className="product-options">
    //                                                                 {val.customizable_options.map((op, idx) => (
    //                                                                     <div className="option-wrapper" key={idx}>
    //                                                                         <div className="flex flex-row option-wrapper__item">
    //                                                                             <strong>
    //                                                                                 {op.label}
    //                                                                                 {' '}
    //                                                                                 :
    //                                                                             </strong>
    //                                                                             {op.values.map((item, idt) => (
    //                                                                                 <p key={idt} className="option-item">
    //                                                                                     {(item.label && item.label !== '')
    //                                                                                         ? item.label : item.value}
    //                                                                                 </p>
    //                                                                             ))}
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 ))}
    //                                                             </div>
    //                                                         ) : null}
    //                                                     </TableCell>
    //                                                     <TableCell
    //                                                         align="right"
    //                                                         className={styles.noBorder}
    //                                                     >
    //                                                         <Typography variant="span" align="right" letter="capitalize" type="semiBold">
    //                                                             {formatPrice(
    //                                                                 val.prices.row_total_including_tax.value,
    //                                                                 val.prices.row_total_including_tax.currency || 'IDR',
    //                                                             )}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell
    //                                                         align="right"
    //                                                         className={styles.noBorder}
    //                                                     >
    //                                                         <Typography variant="span" align="right" letter="capitalize">
    //                                                             {val.quantity}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                     <TableCell
    //                                                         align="right"
    //                                                         className={styles.noBorder}
    //                                                     >
    //                                                         <Typography variant="span" align="right" letter="capitalize" type="semiBold">
    //                                                             {formatPrice(
    //                                                                 val.prices.row_total_including_tax.value,
    //                                                                 val.prices.row_total_including_tax.currency,
    //                                                             )}
    //                                                         </Typography>
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             ))
    //                                         }
    //                                     </>
    //                                 )}
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                 )
    //             }
    //         </div>

    //     </div>
    // );
};

export default ListItemCart;
