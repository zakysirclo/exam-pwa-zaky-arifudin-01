/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import cx from 'classnames';

const OptionsItem = (props) => {
    const {
        name, type, position, small_image, breadcrumbs, logo, city, seller_name,
    } = props;
    const citySplit = city?.split(',');
    let breadcrumbsText = '';
    if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            breadcrumbsText += `${element.category_name} > `;
        }
    }
    return null;
    // return (
    //     <>
    //         {type === 'product' ? (
    //             <div className={position === 0 ? classNames(styles.listContainer, styles.firstListContainer) : styles.listContainer}>
    //                 {position === 0 ? <div className={styles.topTitle}>Product</div> : null}

    //                 <div className={styles.imageContainer}>
    //                     <img className={styles.img} src={small_image.url} />
    //                 </div>
    //                 <div className={styles.title}>{name}</div>
    //                 {seller_name && (
    //                     <div className={styles.infoSeller}>
    //                         {/* <StorefrontIcon className={styles.iconSeller} /> */}
    //                         <div className={styles.titleSeller}>{seller_name}</div>
    //                     </div>
    //                 )}
    //             </div>
    //         ) : null}
    //         {type === 'category' ? (
    //             <div className={styles.listContainerCategory}>
    //                 {position === 0 ? <div className={classNames(styles.topTitle, styles.topTitleCategory)}>Categories</div> : null}

    //                 <div className={styles.breadcrumbs}>{breadcrumbsText}</div>
    //                 <div className={styles.titleCategory}>{name}</div>
    //             </div>
    //         ) : null}
    //         {type === 'seller' ? (
    //             <div className={position === 0 ? classNames(styles.listContainer, styles.firstListContainer) : styles.listContainer}>
    //                 {position === 0 ? <div className={styles.topTitle}>Seller</div> : null}

    //                 <div className={styles.imageContainer}>
    //                     <img className={styles.img} src={logo} />
    //                 </div>
    //                 <div className={styles.title}>{name}</div>
    //                 <div className={styles.address}>{citySplit ? citySplit[0] : ''}</div>
    //             </div>
    //         ) : null}
    //     </>
    // );
};

export default OptionsItem;
