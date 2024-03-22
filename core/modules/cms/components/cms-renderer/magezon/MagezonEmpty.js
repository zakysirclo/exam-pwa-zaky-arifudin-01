import { BREAKPOINTS } from '@core/theme/vars';
import cx from 'classnames';

const MagezonEmpty = (props) => {
    const {
        height, xs_height, sm_height, md_height, lg_height,
    } = props;

    // remove the px first then add it later to support inputs where user can choose between entering number only or with px string
    const getHeight = (v) => `${v.replace('px', '')}px`;

    return (
        <div className={cx('mgz-empty', 'w-full')}>
            <style jsx>
                {`
                    .mgz-empty {
                        height: ${height}px;
                    }
                    @media (max-width: ${BREAKPOINTS.sm - 1}px) {
                        .mgz-empty {
                            ${xs_height ? `height: ${getHeight(xs_height)};` : ''}
                        }
                    }
                    @media (max-width: ${BREAKPOINTS.md - 1}px) {
                        .mgz-empty {
                            ${sm_height ? `height: ${getHeight(sm_height)};` : ''}
                        }
                    }
                    @media (max-width: ${BREAKPOINTS.lg - 1}px) {
                        .mgz-empty {
                            ${md_height ? `height: ${getHeight(md_height)};` : ''}
                        }
                    }
                    @media (max-width: ${BREAKPOINTS.xl - 1}px) {
                        .mgz-empty {
                            ${lg_height ? `height: ${getHeight(lg_height)};` : ''}
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonEmpty;
