export const getUAString = (appCtx) => {
    const { ctx } = appCtx;
    return ctx?.req?.headers['user-agent'] || '';
};

export const getDeviceByUA = (uastring) => {
    const isDesktop = !!uastring.match(/Windows|Linux/i);
    const isMobile = !!uastring.match(/iPhone|iPad|Android/i);

    return {
        isDesktop: isDesktop || !isMobile,
        isMobile,
    };
};
