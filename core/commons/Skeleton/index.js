import { COLORS } from '@core/theme/vars';
import cx from 'classnames';

const Skeleton = ({
    className,
    height = 20,
    width = 100,
    radius = 5,
    duration = 1,
    color = COLORS.neutral[100],
    colorShimmer = COLORS.neutral[50],
}) => (
    <div
        style={{
            ...(width ? { width } : null),
            ...(height ? { height } : null),
        }}
        className={cx(
            'section-skeleton',
            'shimmer',
            'h-10',
            className,
        )}
    >
        <style jsx>
            {`
                    .shimmer {
                        background: ${color};
                        background-image: linear-gradient(to right, ${color} 0%, ${colorShimmer} 20%, ${color} 40%, ${color} 100%);
                        background-repeat: no-repeat;
                        background-size: 800px 104px; 
                        display: inline-block;
                        position: relative; 
                        border-radius: ${radius}px;
                        
                        -webkit-animation-duration: ${duration}s;
                        -webkit-animation-fill-mode: forwards; 
                        -webkit-animation-iteration-count: infinite;
                        -webkit-animation-name: placeholderShimmer;
                        -webkit-animation-timing-function: linear;
                    }

                    @-webkit-keyframes placeholderShimmer {
                        0% {
                            background-position: -100vw 0;
                        }
                        
                        100% {
                            background-position: 100vw 0; 
                        }
                    }
                  
                `}
        </style>
    </div>
);

export default Skeleton;
