import { storeConfigVar } from '@core/services/graphql/cache';

const pwaConfig = storeConfigVar();

export const FONT_DEFAULT = {
    fontFamily: pwaConfig && pwaConfig.pwa && pwaConfig.pwa.primary_color
        ? `${pwaConfig.pwa.default_font.replace(' ', '-')} !important` : 'Montserrat !important',
};

export const FONT_6 = {
    fontSize: 6,
};

export const FONT_8 = {
    fontSize: 8,
};

export const FONT_10 = {
    fontSize: 10,
};

export const FONT_12 = {
    fontSize: 12,
};

export const FONT_14 = {
    fontSize: 14,
};

export const FONT_16 = {
    fontSize: 16,
};

export const FONT_24 = {
    fontSize: 24,
};

export const FONT_BIG = {
    fontSize: 30,
};

export const FONT_REGULAR = {
    ...FONT_DEFAULT,
    ...FONT_12,
    fontWeight: 'reguler',
};

export const textAlign = (align = 'left') => ({
    textAlign: align,
});
