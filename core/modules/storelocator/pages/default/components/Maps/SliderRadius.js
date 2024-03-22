import RangeSlider from '@common_rangeslider';

const SliderRadius = ({ radius, setRadius }) => {
    const onChange = (val) => {
        setRadius(val[1]);
    };
    return (
        <div className="slider-radius">
            <style jsx>
                {`
                    .slider-radius > :global(span) {
                        padding: 20px 0;
                    }
                `}
            </style>
            <div className="flex flex-col gap-4">
                <div style={{ lineHeight: '10px' }}>
                    1 Km
                    <span style={{ float: 'right' }}>100 Km</span>
                </div>
                <RangeSlider
                    minValue={1000}
                    maxValue={100 * 1000}
                    value={[1000, radius]}
                    onChange={onChange}
                    disableInput
                    hideLabel
                />
            </div>
            <style jsx>
                {`
                    .slider-radius :global(.thumb--left) {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default SliderRadius;
