/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Typography from '@common_typography';
import { SkeletonShippingMethod } from '@core_modules/paypal/pages/review/components/Skeleton';

const ShippingMethodView = (props) => {
    const {
        t, checkout, data = [], onChange,
    } = props;
    return null;
    // return (
    //     <div className="flex flex-row">
    //         <div className="xs:basis-full">
    //             <Typography variant="span" letter="capitalize" type="bold">
    //                 {t('checkout:shippingMethod')}
    //             </Typography>
    //         </div>
    //         <div className="xs:basis-full">
    //             {
    //                 checkout.loading.all
    //                     ? (<SkeletonShippingMethod />)
    //                     : data.length > 0
    //                         ? (
    //                             <div className="xs:basis-full">
    //                                 <Select
    //                                     native
    //                                     defaultValue={checkout.selectedShippingMethod}
    //                                     value={checkout.selectedShippingMethod}
    //                                     id="grouped-select"
    //                                     className={styles.selectBox}
    //                                     onChange={onChange}
    //                                 >
    //                                     {
    //                                         checkout.selectedShippingMethod === null && (
    //                                             <option
    //                                                 value=""
    //                                             >
    //                                                 {t('checkout:paypal:noShippingMethod')}
    //                                             </option>
    //                                         )
    //                                     }
    //                                     {
    //                                         data.map((item, key) => (
    //                                             <optgroup
    //                                                 key={key}
    //                                                 label={t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)
    //                                                         === `shippingGrouping.${item.group.replace('sg-', '')}`
    //                                                     ? item.group.replace('pg-', '')
    //                                                     : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
    //                                             >
    //                                                 {
    //                                                     item.data && item.data.length > 0
    //                                                         && item.data.map((list, idx) => (
    //                                                             <option
    //                                                                 key={idx}
    //                                                                 value={list.value}
    //                                                             >
    //                                                                 {list.label}
    //                                                             </option>
    //                                                         ))
    //                                                 }
    //                                             </optgroup>
    //                                         ))
    //                                     }
    //                                 </Select>
    //                             </div>
    //                         )
    //                         : (<Typography variant="p">{t('checkout:noShipping')}</Typography>)
    //             }
    //         </div>
    //     </div>
    // );
};

export default ShippingMethodView;
