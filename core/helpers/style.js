export const getFlexBasisTailwind = (basis = 0, mediaQuery = '') => {
    if (!mediaQuery || mediaQuery === '') {
        switch (basis) {
        case 12:
            return 'basis-full';
        case 11:
            return 'basis-11/12';
        case 10:
            return 'basis-10/12';
        case 9:
            return 'basis-9/12';
        case 8:
            return 'basis-8/12';
        case 7:
            return 'basis-7/12';
        case 6:
            return 'basis-6/12';
        case 5:
            return 'basis-5/12';
        case 4:
            return 'basis-4/12';
        case 3:
            return 'basis-3/12';
        case 2:
            return 'basis-2/12';
        case 1:
            return 'basis-1/12';

        default:
            break;
        }
    }

    // XL Basis
    if (mediaQuery && mediaQuery === 'xl') {
        switch (basis) {
        case 12:
            return 'xl:basis-full';
        case 11:
            return 'xl:basis-11/12';
        case 10:
            return 'xl:basis-10/12';
        case 9:
            return 'xl:basis-9/12';
        case 8:
            return 'xl:basis-8/12';
        case 7:
            return 'xl:basis-7/12';
        case 6:
            return 'xl:basis-6/12';
        case 5:
            return 'xl:basis-5/12';
        case 4:
            return 'xl:basis-4/12';
        case 3:
            return 'xl:basis-3/12';
        case 2:
            return 'xl:basis-2/12';
        case 1:
            return 'xl:basis-1/12';

        default:
            break;
        }
    }

    // LG Basis
    if (mediaQuery && mediaQuery === 'lg') {
        switch (basis) {
        case 12:
            return 'lg:basis-full';
        case 11:
            return 'lg:basis-11/12';
        case 10:
            return 'lg:basis-10/12';
        case 9:
            return 'lg:basis-9/12';
        case 8:
            return 'lg:basis-8/12';
        case 7:
            return 'lg:basis-7/12';
        case 6:
            return 'lg:basis-6/12';
        case 5:
            return 'lg:basis-5/12';
        case 4:
            return 'lg:basis-4/12';
        case 3:
            return 'lg:basis-3/12';
        case 2:
            return 'lg:basis-2/12';
        case 1:
            return 'lg:basis-1/12';

        default:
            break;
        }
    }

    // MD Basis
    if (mediaQuery && mediaQuery === 'md') {
        switch (basis) {
        case 12:
            return 'md:basis-full';
        case 11:
            return 'md:basis-11/12';
        case 10:
            return 'md:basis-10/12';
        case 9:
            return 'md:basis-9/12';
        case 8:
            return 'md:basis-8/12';
        case 7:
            return 'md:basis-7/12';
        case 6:
            return 'md:basis-6/12';
        case 5:
            return 'md:basis-5/12';
        case 4:
            return 'md:basis-4/12';
        case 3:
            return 'md:basis-3/12';
        case 2:
            return 'md:basis-2/12';
        case 1:
            return 'md:basis-1/12';

        default:
            break;
        }
    }

    // SM Basis
    if (mediaQuery && mediaQuery === 'sm') {
        switch (basis) {
        case 12:
            return 'sm:basis-full';
        case 11:
            return 'sm:basis-11/12';
        case 10:
            return 'sm:basis-10/12';
        case 9:
            return 'sm:basis-9/12';
        case 8:
            return 'sm:basis-8/12';
        case 7:
            return 'sm:basis-7/12';
        case 6:
            return 'sm:basis-6/12';
        case 5:
            return 'sm:basis-5/12';
        case 4:
            return 'sm:basis-4/12';
        case 3:
            return 'sm:basis-3/12';
        case 2:
            return 'sm:basis-2/12';
        case 1:
            return 'sm:basis-1/12';

        default:
            break;
        }
    }

    // XS Basis
    if (mediaQuery && mediaQuery === 'xs') {
        switch (basis) {
        case 12:
            return 'xs:basis-full';
        case 11:
            return 'xs:basis-11/12';
        case 10:
            return 'xs:basis-10/12';
        case 9:
            return 'xs:basis-9/12';
        case 8:
            return 'xs:basis-8/12';
        case 7:
            return 'xs:basis-7/12';
        case 6:
            return 'xs:basis-6/12';
        case 5:
            return 'xs:basis-5/12';
        case 4:
            return 'xs:basis-4/12';
        case 3:
            return 'xs:basis-3/12';
        case 2:
            return 'xs:basis-2/12';
        case 1:
            return 'xs:basis-1/12';

        default:
            break;
        }
    }

    return '';
};

export const getColSpanTailwind = (basis = 0, mediaQuery = '') => {
    if (!mediaQuery || mediaQuery === '') {
        switch (basis) {
        case 12:
            return 'col-span-full';
        case 11:
            return 'col-span-11';
        case 10:
            return 'col-span-10';
        case 9:
            return 'col-span-9';
        case 8:
            return 'col-span-8';
        case 7:
            return 'col-span-7';
        case 6:
            return 'col-span-6';
        case 5:
            return 'col-span-5';
        case 4:
            return 'col-span-4';
        case 3:
            return 'col-span-3';
        case 2:
            return 'col-span-2';
        case 1:
            return 'col-span-1';

        default:
            break;
        }
    }

    // XL Basis
    if (mediaQuery && mediaQuery === 'xl') {
        switch (basis) {
        case 12:
            return 'xl:col-span-full';
        case 11:
            return 'xl:col-span-11';
        case 10:
            return 'xl:col-span-10';
        case 9:
            return 'xl:col-span-9';
        case 8:
            return 'xl:col-span-8';
        case 7:
            return 'xl:col-span-7';
        case 6:
            return 'xl:col-span-6';
        case 5:
            return 'xl:col-span-5';
        case 4:
            return 'xl:col-span-4';
        case 3:
            return 'xl:col-span-3';
        case 2:
            return 'xl:col-span-2';
        case 1:
            return 'xl:col-span-1';

        default:
            break;
        }
    }

    // LG Basis
    if (mediaQuery && mediaQuery === 'lg') {
        switch (basis) {
        case 12:
            return 'lg:col-span-full';
        case 11:
            return 'lg:col-span-11';
        case 10:
            return 'lg:col-span-10';
        case 9:
            return 'lg:col-span-9';
        case 8:
            return 'lg:col-span-8';
        case 7:
            return 'lg:col-span-7';
        case 6:
            return 'lg:col-span-6';
        case 5:
            return 'lg:col-span-5';
        case 4:
            return 'lg:col-span-4';
        case 3:
            return 'lg:col-span-3';
        case 2:
            return 'lg:col-span-2';
        case 1:
            return 'lg:col-span-1';

        default:
            break;
        }
    }

    // MD Basis
    if (mediaQuery && mediaQuery === 'md') {
        switch (basis) {
        case 12:
            return 'md:col-span-full';
        case 11:
            return 'md:col-span-11';
        case 10:
            return 'md:col-span-10';
        case 9:
            return 'md:col-span-9';
        case 8:
            return 'md:col-span-8';
        case 7:
            return 'md:col-span-7';
        case 6:
            return 'md:col-span-6';
        case 5:
            return 'md:col-span-5';
        case 4:
            return 'md:col-span-4';
        case 3:
            return 'md:col-span-3';
        case 2:
            return 'md:col-span-2';
        case 1:
            return 'md:col-span-1';

        default:
            break;
        }
    }

    // SM Basis
    if (mediaQuery && mediaQuery === 'sm') {
        switch (basis) {
        case 12:
            return 'sm:col-span-full';
        case 11:
            return 'sm:col-span-11';
        case 10:
            return 'sm:col-span-10';
        case 9:
            return 'sm:col-span-9';
        case 8:
            return 'sm:col-span-8';
        case 7:
            return 'sm:col-span-7';
        case 6:
            return 'sm:col-span-6';
        case 5:
            return 'sm:col-span-5';
        case 4:
            return 'sm:col-span-4';
        case 3:
            return 'sm:col-span-3';
        case 2:
            return 'sm:col-span-2';
        case 1:
            return 'sm:col-span-1';

        default:
            break;
        }
    }

    // XS Basis
    if (mediaQuery && mediaQuery === 'xs') {
        switch (basis) {
        case 12:
            return 'xs:col-span-full';
        case 11:
            return 'xs:col-span-11';
        case 10:
            return 'xs:col-span-10';
        case 9:
            return 'xs:col-span-9';
        case 8:
            return 'xs:col-span-8';
        case 7:
            return 'xs:col-span-7';
        case 6:
            return 'xs:col-span-6';
        case 5:
            return 'xs:col-span-5';
        case 4:
            return 'xs:col-span-4';
        case 3:
            return 'xs:col-span-3';
        case 2:
            return 'xs:col-span-2';
        case 1:
            return 'xs:col-span-1';

        default:
            break;
        }
    }

    return '';
};

export const generateGridItemClass = (basis = 0, mediaQuery = '') => {
    if (!mediaQuery || mediaQuery === '') {
        switch (basis) {
        case 12:
            return '!basis-1/12';
        case 11:
            return '!basis-1/11';
        case 10:
            return '!basis-1/10';
        case 9:
            return '!basis-1/9';
        case 8:
            return '!basis-1/8';
        case 7:
            return '!basis-1/7';
        case 6:
            return '!basis-1/6';
        case 5:
            return '!basis-1/5';
        case 4:
            return '!basis-1/4';
        case 3:
            return '!basis-1/3';
        case 2:
            return '!basis-1/2';
        case 1:
            return '!basis-1/1';

        default:
            break;
        }
    }

    // XL Basis
    if (mediaQuery && mediaQuery === 'xl') {
        switch (basis) {
        case 12:
            return 'xl:!basis-1/12';
        case 11:
            return 'xl:!basis-1/11';
        case 10:
            return 'xl:!basis-1/10';
        case 9:
            return 'xl:!basis-1/9';
        case 8:
            return 'xl:!basis-1/8';
        case 7:
            return 'xl:!basis-1/7';
        case 6:
            return 'xl:!basis-1/6';
        case 5:
            return 'xl:!basis-1/5';
        case 4:
            return 'xl:!basis-1/4';
        case 3:
            return 'xl:!basis-1/3';
        case 2:
            return 'xl:!basis-1/2';
        case 1:
            return 'xl:!basis-1/1';

        default:
            break;
        }
    }

    // LG Basis
    if (mediaQuery && mediaQuery === 'lg') {
        switch (basis) {
        case 12:
            return 'lg:!basis-1/12';
        case 11:
            return 'lg:!basis-1/11';
        case 10:
            return 'lg:!basis-1/10';
        case 9:
            return 'lg:!basis-1/9';
        case 8:
            return 'lg:!basis-1/8';
        case 7:
            return 'lg:!basis-1/7';
        case 6:
            return 'lg:!basis-1/6';
        case 5:
            return 'lg:!basis-1/5';
        case 4:
            return 'lg:!basis-1/4';
        case 3:
            return 'lg:!basis-1/3';
        case 2:
            return 'lg:!basis-1/2';
        case 1:
            return 'lg:!basis-1/1';

        default:
            break;
        }
    }

    // MD Basis
    if (mediaQuery && mediaQuery === 'md') {
        switch (basis) {
        case 12:
            return 'md:!basis-1/12';
        case 11:
            return 'md:!basis-1/11';
        case 10:
            return 'md:!basis-1/10';
        case 9:
            return 'md:!basis-1/9';
        case 8:
            return 'md:!basis-1/8';
        case 7:
            return 'md:!basis-1/7';
        case 6:
            return 'md:!basis-1/6';
        case 5:
            return 'md:!basis-1/5';
        case 4:
            return 'md:!basis-1/4';
        case 3:
            return 'md:!basis-1/3';
        case 2:
            return 'md:!basis-1/2';
        case 1:
            return 'md:!basis-1/1';

        default:
            break;
        }
    }

    // SM Basis
    if (mediaQuery && mediaQuery === 'sm') {
        switch (basis) {
        case 12:
            return 'sm:!basis-1/12';
        case 11:
            return 'sm:!basis-1/11';
        case 10:
            return 'sm:!basis-1/10';
        case 9:
            return 'sm:!basis-1/9';
        case 8:
            return 'sm:!basis-1/8';
        case 7:
            return 'sm:!basis-1/7';
        case 6:
            return 'sm:!basis-1/6';
        case 5:
            return 'sm:!basis-1/5';
        case 4:
            return 'sm:!basis-1/4';
        case 3:
            return 'sm:!basis-1/3';
        case 2:
            return 'sm:!basis-1/2';
        case 1:
            return 'sm:!basis-1/1';

        default:
            break;
        }
    }

    // XS Basis
    if (mediaQuery && mediaQuery === 'xs') {
        switch (basis) {
        case 12:
            return 'xs:!basis-1/12';
        case 11:
            return 'xs:!basis-1/11';
        case 10:
            return 'xs:!basis-1/10';
        case 9:
            return 'xs:!basis-1/9';
        case 8:
            return 'xs:!basis-1/8';
        case 7:
            return 'xs:!basis-1/7';
        case 6:
            return 'xs:!basis-1/6';
        case 5:
            return 'xs:!basis-1/5';
        case 4:
            return 'xs:!basis-1/4';
        case 3:
            return 'xs:!basis-1/3';
        case 2:
            return 'xs:!basis-1/2';
        case 1:
            return 'xs:!basis-1/1';

        default:
            break;
        }
    }

    return '';
};

export default {
    getFlexBasisTailwind,
};
