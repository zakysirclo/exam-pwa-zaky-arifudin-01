const getPrice = (cachePrice, generateIdentifier, dataPrice) => {
    let productPrice = [];

    if (cachePrice[generateIdentifier] && cachePrice[generateIdentifier].products && cachePrice[generateIdentifier].products.items) {
        productPrice = cachePrice[generateIdentifier].products.items;
    } else if (dataPrice && dataPrice.products && dataPrice.products.items) {
        productPrice = dataPrice.products.items;
    }

    return productPrice;
};

export default getPrice;
