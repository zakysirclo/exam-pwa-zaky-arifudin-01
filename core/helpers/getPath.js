const getPath = (href = '') => {
    let path = href;
    try {
        if (href !== '#') {
            const checkUrl = new URL(href);
            path = checkUrl.pathname.replace('.html', '');
        }
    } catch (e) {
        console.log(`${e} ${href}`);
    }

    return path;
};

export default getPath;
