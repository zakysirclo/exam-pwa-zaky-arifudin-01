import dynamic from 'next/dynamic';

/* eslint-disable no-nested-ternary */
const GoogleMaps = dynamic(() => import('@common_googlemaps'), { ssr: false });

const MagezonGoogleMaps = (props) => {
    // prettier-ignore
    const {
        infobox_background_color, items, map_draggable, map_width, map_height, map_zoom, storeConfig,
    } = props;

    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;
    const geocodingKey = (storeConfig || {}).icube_pinlocation_geocoding_key;
    const center = items.find((item) => item.center === '1') || items[0];
    const updatedItems = [...items.filter((item) => item.center !== '1'), center];

    const [mapPosition, setMapPosition] = React.useState({
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng),
    });

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const elementDimension = {
        width: map_width && map_width.toString().includes('%') ? map_width : `${map_width}px`,
        height: map_height && map_height.toString().includes('%') ? map_height : `${map_height}px`,
    };

    return (
        <>
            <div className="mgz-google-maps">
                {gmapKey && (
                    <>
                        {
                            typeof window !== 'undefined' && (
                                <GoogleMaps
                                    gmapKey={gmapKey}
                                    geocodingKey={geocodingKey}
                                    markers={updatedItems}
                                    defaultZoom={map_zoom}
                                    mapPosition={mapPosition}
                                    dragMarkerDone={handleDragPosition}
                                    markerIcon={storeConfig.secure_base_media_url}
                                    useCustomMarkerIcon={storeConfig.secure_base_media_url !== ''}
                                    markerDraggable={map_draggable}
                                    containerStyle={elementDimension}
                                    mode="map-only"
                                />
                            )
                        }
                    </>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw']) {
                        background-color: ${infobox_background_color || '#ffffff'};
                        max-height: none !important;
                        padding: 10px !important;
                    }
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw'] > div) {
                        overflow: visible !important;
                        max-height: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonGoogleMaps;
