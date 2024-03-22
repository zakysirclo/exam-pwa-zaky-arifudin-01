/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import dynamic from 'next/dynamic';
import { headerVersion } from '@config';

const HeaderList = {
    v1: dynamic(() => import('@core_modules/theme/components/header/components/v1')),
    v2: dynamic(() => import('@core_modules/theme/components/header/components/v2')),
    v3: dynamic(() => import('@core_modules/theme/components/header/components/v3')),
    v4: dynamic(() => import('@core_modules/theme/components/header/components/v4')),
};

const ViewTopNavigation = (props) => {
    const Header = HeaderList[headerVersion];

    return <Header {...props} />;
};

export default ViewTopNavigation;
