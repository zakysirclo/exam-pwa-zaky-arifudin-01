/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import React from 'react';
import Link from 'next/link';
import Typography from '@common_typography';

function EtalaseDesktop({
    noBanner, t, data, route,
}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const url = !noBanner ? `/seller/${route.query.sellerId}/product` : `/seller/${route.query.sellerId}`;

    return null;
    // return (
    //     <div className={styles.etalaseContainer}>
    //         <div className="etalase-content">
    //             <Typography variant="label" type="bold" size="14">
    //                 {t('seller:storeFront')}
    //             </Typography>
    //             {
    //                 data && (
    //                     <List>
    //                         <Link
    //                             href={{
    //                                 pathname: url,
    //                             }}
    //                             key={0}
    //                         >

    //                             <ListItem
    //                                 button
    //                                 selected={selectedIndex === 0}
    //                                 onClick={(event) => handleListItemClick(event, 0)}
    //                             >
    //                                 <ListItemIcon><img src="/assets/img/etalase-product.svg" alt="etalase-product" width="24px" /></ListItemIcon>
    //                                 <ListItemText>
    //                                     <Typography variant="label" type="regular" size="12">
    //                                         {t('seller:allProducts')}
    //                                     </Typography>
    //                                 </ListItemText>

    //                             </ListItem>

    //                         </Link>
    //                         { data.map((list) => (
    //                             (<Link
    //                                 href={{
    //                                     pathname: url,
    //                                     query: { filter: list.entity_id },
    //                                 }}
    //                                 key={list.entity_id}
    //                             >

    //                                 <ListItem
    //                                     button
    //                                     selected={selectedIndex === list.entity_id}
    //                                     onClick={(event) => handleListItemClick(event, list.entity_id)}
    //                                 >

    //                                     {
    //                                         list.image && (
    //                                             <ListItemIcon><img src={list.image} alt={list.name} width="24px" /></ListItemIcon>
    //                                         )
    //                                     }
    //                                     <ListItemText>
    //                                         <Typography variant="label" type="regular" size="12">
    //                                             {list.name}
    //                                         </Typography>
    //                                     </ListItemText>

    //                                 </ListItem>

    //                             </Link>)
    //                         ))}
    //                     </List>
    //                 )
    //             }
    //         </div>
    //     </div>
    // );
}

export default EtalaseDesktop;
