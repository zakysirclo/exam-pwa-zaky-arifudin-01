import Typography from '@common_typography';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezonIcon';

const MagezonSeparator = (props) => {
    const {
        //
        title,
        title_tag,
        title_align,
        line_weight,
        title_color,
        style,
        add_icon,
        el_width,
        icon,
        icon_position,
        color,
    } = props;

    const justifyContent = (align) => {
        switch (align) {
        case 'center':
            return 'center';
        case 'left':
            return 'flex-start';
        case 'right':
            return 'flex-end';
        default:
            return '';
        }
    };

    return (
        <div className="magezon-separator">
            <div className="magezone-separator-box">
                <Typography variant={title_tag} className="magezon-separator-title" letter="uppercase">
                    {add_icon && icon_position === 'left' && icon !== '' && <MagezonIcon icon={icon} icon_size="lg" />}
                    {title}
                    {add_icon && icon_position === 'right' && icon !== '' && <MagezonIcon icon={icon} icon_size="lg" />}
                </Typography>
            </div>
            <div className="mgz-element-separator-line" />
            <style jsx>
                {`
                    .magezon-separator {
                        width: 100%;
                        position: relative;
                    }
                    .magezone-separator-box {
                        width: 100%;
                        position: relative;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        ${title_align ? `text-align: ${title_align};` : ''}
                        ${title_align ? `justify-content: ${justifyContent(title_align)};` : ''}
                    }
                    .magezon-separator :global(.magezon-separator-title) {
                        position: relative;
                        padding: 12px;
                        ${title_color ? `color: ${title_color} !important;` : ''}
                        ${title_align ? `text-align: ${title_align};` : ''}
                        background: #fff;
                        z-index: 1;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .mgz-element-separator-line {
                        -webkit-transform: translate(0%, -50%);
                        -moz-transform: translate(0%, -50%);
                        -ms-transform: translate(0%, -50%);
                        -o-transform: translate(0%, -50%);
                        position: absolute;
                        left: 5px;
                        right: 5px;
                        top: 50%;
                        height: 1px;
                        ${line_weight ? `border-top: ${line_weight}px solid transparent;` : ''}
                        margin: 0 auto;
                        width: calc(${el_width || '100%'} - 10px);
                        ${color ? `border-color: ${color};` : ''}
                        ${style ? `border-top-style: ${style};` : ''}
                        ${line_weight ? `border-top-width: ${line_weight}px;` : ''}
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSeparator;
