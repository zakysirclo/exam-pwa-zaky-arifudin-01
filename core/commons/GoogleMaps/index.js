/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import TextField from '@common_forms/TextField';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { encrypt } from '@core/helpers/clientEncryption';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import cx from 'classnames';
import { capitalizeEachWord } from '@core/helpers/text';

// Set initial refs for google maps instance
const refs = {
    marker: null,
    autoComplete: null,
    googleMap: null,
};

// Get marker components instance
const markerLoad = (ref) => {
    refs.marker = ref;
};

// Get google map instance
const mapLoad = (ref) => {
    refs.googleMap = ref;
};

const GoogleMaps = (props) => {
    const {
        gmapKey,
        geocodingKey,
        formik = () => {},
        dragMarkerDone,
        defaultZoom = 17,
        mapPosition,
        markerIcon,
        markerDraggable = true,
        useCustomMarkerIcon = false,
        useLabel = false,
        inputClassName = '',
        containerStyle = {
            width: '100%',
            height: '250px',
            marginTop: '1rem',
        },
        mode = 'map-only',
    } = props;
    const { t } = useTranslation(['common']);

    // set libraries to use in Google Maps API
    const [libraries] = useState(['places', 'geometry']);

    // Set initial bounds to autocomplete services
    const [stateBounds, setStateBounds] = useState({
        northeast: {},
        southwest: {},
    });

    // Initiate google maps instance with configurations
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: gmapKey,
        libraries,
        url: 'https://gmapkey.sandbox.id/maps/api/js',
    });

    // Set a new coordinates information when user drag the marker icon
    const handleDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        dragMarkerDone(newPosition);
    };

    // Get a new coordinates bounds based on current address information input (village, district, city, region)
    useEffect(() => {
        if (formik && geocodingKey && mode === 'location-search') {
            // Check if selected country is Indonesia
            if (formik.values.country.full_name_locale === 'Indonesia') {
                if (!!formik.values.village && !!formik.values.district && !!formik.values.city && !!formik.values.region) {
                    const query = `${formik.values.village.label}+${formik.values.district.label}+${formik.values.city.label}+${formik.values.region.name}`;
                    const gmapApiKey = encrypt(geocodingKey);
                    fetch('/geocoding-services', {
                        method: 'POST',
                        body: JSON.stringify({
                            query,
                            gmapApiKey,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.results.length > 0) {
                                const { bounds, location } = responseData.results[0].geometry;
                                dragMarkerDone({
                                    lat: location.lat,
                                    lng: location.lng,
                                });
                                setStateBounds({
                                    northeast: {
                                        lat: parseFloat(bounds.northeast.lat),
                                        lng: parseFloat(bounds.northeast.lng),
                                    },
                                    southwest: {
                                        lat: parseFloat(bounds.southwest.lat),
                                        lng: parseFloat(bounds.southwest.lng),
                                    },
                                });
                            }
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                }
                // Check if selected country is USA
            } else if (formik.values.country.full_name_locale === 'United States') {
                if (!!formik.values.region && !!formik.values.country.full_name_locale) {
                    const query = `${formik.values.region.name}+${formik.values.country.full_name_locale}`;
                    const gmapApiKey = encrypt(geocodingKey);
                    fetch('/geocoding-services', {
                        method: 'POST',
                        body: JSON.stringify({
                            query,
                            gmapApiKey,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.results.length > 0) {
                                const { bounds, location } = responseData.results[0].geometry;
                                dragMarkerDone({
                                    lat: location.lat,
                                    lng: location.lng,
                                });
                                setStateBounds({
                                    northeast: {
                                        lat: parseFloat(bounds.northeast.lat),
                                        lng: parseFloat(bounds.northeast.lng),
                                    },
                                    southwest: {
                                        lat: parseFloat(bounds.southwest.lat),
                                        lng: parseFloat(bounds.southwest.lng),
                                    },
                                });
                            }
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                }
                // Check if selected country beside Indonesia or USA
            } else {
                const query = `${formik.values.country.full_name_locale}`;
                const gmapApiKey = encrypt(geocodingKey);
                fetch('/geocoding-services', {
                    method: 'POST',
                    body: JSON.stringify({
                        query,
                        gmapApiKey,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.results.length > 0) {
                            const { bounds, location } = responseData.results[0].geometry;
                            dragMarkerDone({
                                lat: location.lat,
                                lng: location.lng,
                            });
                            setStateBounds({
                                northeast: {
                                    lat: parseFloat(bounds.northeast.lat),
                                    lng: parseFloat(bounds.northeast.lng),
                                },
                                southwest: {
                                    lat: parseFloat(bounds.southwest.lat),
                                    lng: parseFloat(bounds.southwest.lng),
                                },
                            });
                        }
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            }
        }
    }, [formik.values.country, formik.values.district, formik.values.region, formik.values.village]);

    // Reference on this article
    // https://dev.to/abdeldjalilhachimi/how-to-use-google-maps-places-autocomplete-with-react-js-161j
    const inputRef = React.useRef();
    if (isLoaded) {
        const { google } = window;
        const autoComplete = new google.maps.places.Autocomplete(inputRef.current, {
            bounds: new window.google.maps.LatLngBounds(
                // eslint-disable-next-line no-undef
                new google.maps.LatLng(
                    parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat),
                    parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng),
                ),
                // eslint-disable-next-line no-undef
                new google.maps.LatLng(
                    parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat),
                    parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng),
                ),
            ),
            strictBounds: !!geocodingKey,
        });

        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
            }
            if (place.geometry.viewport || place.geometry.location) {
                // do something
                const { name, address_components, geometry } = place;

                const tempInputValue = formik.values.addressDetail;
                const street_name = address_components.filter((item) => item.types.includes('route'));

                const newPosition = {
                    lat: geometry.location.lat(),
                    lng: geometry.location.lng(),
                };
                dragMarkerDone(newPosition);

                if (tempInputValue !== name) {
                    if (street_name[0] !== undefined) {
                        if (street_name[0].long_name === name) {
                            if (tempInputValue === street_name[0].long_name || tempInputValue === street_name[0].short_name) {
                                formik.setFieldValue('addressDetail', `${street_name[0].long_name}`);
                            } else if (tempInputValue.length < street_name[0].long_name.length || tempInputValue.length === street_name[0].long_name.length) {
                                formik.setFieldValue('addressDetail', `${street_name[0].long_name}`);
                            } else {
                                formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                            }
                        } else if (tempInputValue.length > name.length) {
                            if (
                                tempInputValue.toLowerCase().includes(street_name[0].long_name.toLowerCase()) ||
                                tempInputValue.toLowerCase().includes(street_name[0].short_name.toLowerCase()) ||
                                tempInputValue.toLowerCase().includes(name.toLowerCase())
                            ) {
                                // eslint-disable-next-line max-len
                                if (
                                    tempInputValue.toLowerCase().includes(`${street_name[0].long_name.toLowerCase()} ${name.toLowerCase()}`) ||
                                    tempInputValue.toLowerCase().includes(`${street_name[0].short_name.toLowerCase()} ${name.toLowerCase()}`)
                                ) {
                                    formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                                } else {
                                    formik.setFieldValue('addressDetail', `${street_name[0].short_name} ${name}`);
                                }
                            } else {
                                formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                            }
                        } else if (
                            name.length > street_name[0].short_name.length &&
                            (name.toLowerCase().includes(street_name[0].short_name.toLowerCase()) ||
                                name.toLowerCase().includes(street_name[0].long_name.toLowerCase()))
                        ) {
                            formik.setFieldValue('addressDetail', name);
                        } else if (name.toLowerCase().includes('street')) {
                            formik.setFieldValue('addressDetail', `${street_name[0].short_name}`);
                        } else {
                            formik.setFieldValue('addressDetail', `${street_name[0].short_name} ${name}`);
                        }
                    } else if (tempInputValue.length > name.length) {
                        formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                    } else {
                        formik.setFieldValue('addressDetail', name);
                    }
                } else {
                    formik.setFieldValue('addressDetail', name);
                }
            }
        });
    }

    // Function to render the maps
    // eslint-disable-next-line arrow-body-style
    const renderMap = () => {
        return (
            <>
                {mode === 'location-search' ? (
                    <TextField
                        id="addressForm-addressDetail-textField"
                        className={cx(inputClassName)}
                        autoComplete="new-password"
                        label={useLabel ? t('common:form:addressDetail') : null}
                        placeholder={t('common:search:addressDetail')}
                        inputProps={{
                            name: 'addressDetail',
                            ref: inputRef,
                        }}
                        hintProps={{
                            className: cx('z-10', '!static', 'mt-2'),
                            displayHintText: !!(formik.touched.addressDetail && formik.errors.addressDetail),
                            hintType: 'error',
                            hintText: (formik.touched.addressDetail && formik.errors.addressDetail) || null,
                        }}
                        value={formik.values.addressDetail}
                        onChange={(e) => {
                            formik.handleChange(e);
                        }}
                        onFocusGoogleMap
                    />
                ) : null}
                <GoogleMap
                    id="google-maps-container"
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: parseFloat(mapPosition.lat),
                        lng: parseFloat(mapPosition.lng),
                    }}
                    onLoad={mapLoad}
                    zoom={defaultZoom}
                >
                    {useCustomMarkerIcon ? (
                        <Marker
                            onLoad={markerLoad}
                            position={{
                                lat: parseFloat(mapPosition.lat),
                                lng: parseFloat(mapPosition.lng),
                            }}
                            onDragEnd={(event) => handleDragEnd(event)}
                            draggable={markerDraggable}
                            icon={markerIcon}
                        />
                    ) : (
                        <Marker
                            onLoad={markerLoad}
                            position={{
                                lat: parseFloat(mapPosition.lat),
                                lng: parseFloat(mapPosition.lng),
                            }}
                            onDragEnd={(event) => handleDragEnd(event)}
                            draggable={markerDraggable}
                        />
                    )}
                </GoogleMap>
            </>
        );
    };

    // Return an error message if maps failed to load
    if (loadError) {
        return <div>{t('common:form:mapError')}</div>;
    }

    // Render the maps
    return isLoaded ? renderMap() : <div>{t('common:form:mapLoading')}</div>;
};

export default GoogleMaps;
