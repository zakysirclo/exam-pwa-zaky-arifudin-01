import { useWindowSize } from '@uidotdev/usehooks';
import { BREAKPOINTS } from '@core/theme/vars';

const useMediaQuery = () => {
    const size = useWindowSize();
    const isXl = size.width >= BREAKPOINTS.xl;
    const isLg = size.width >= BREAKPOINTS.lg && size.width < BREAKPOINTS.xl;
    const isMd = size.width >= BREAKPOINTS.md && size.width < BREAKPOINTS.xl;
    const isSm = size.width >= BREAKPOINTS.sm && size.width < BREAKPOINTS.md;
    const isXs = size.width >= BREAKPOINTS.xs && size.width < BREAKPOINTS.sm;
    let screen = '';
    if (isXs || isSm) screen = 'mobile';
    if (isMd) screen = 'tablet';
    if (isXl) screen = 'desktop';
    return {
        isXl,
        isLg,
        isMd,
        isSm,
        isXs,
        isMobile: isXs || isSm,
        isTablet: isMd,
        isDesktop: isXl,
        screen,
        screenWidth: size?.width || 0,
        screenHeight: size?.height || 0,
    };
};

export default useMediaQuery;
