import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const MagezonSection = (props) => {
    const { elements, storeConfig } = props;

    return (
        <>
            <div className="mgz-section">
                {elements.map((element, index) => (
                    <div className="mgz-section-item">
                        <MagezonElement key={index} {...element} storeConfig={storeConfig} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default MagezonSection;
