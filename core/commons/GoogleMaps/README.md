# Description

GoogleMapsAutocomplete

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| gmapKey       | true    | API key for Google Maps API | string |
| geocodingKey       | optional    | label | string |
| formik | true | formik object | object |
| dragMarkerDone | true | function to update marker drag | function |
| defaultZoom | optional | default zoom maps size | number |
| mapPosition | true | object current position maps and must be have key `lat` and `lng` | object |
| markerDraggable | optional | boolean to enable marker draggable | boolean |
| useCustomMarkerIcon | optional | boolean to enable custom marker icon | boolean |
| customMarkerIcon | optional | this field is `required` if `useCustomMarkerIcon` is `true` custom marker icon | string |
| useLabel | optional | boolean to enable label | boolean |
| containerStyle | optional | style for container | css (jsx) object |
| mode | true | mode maps, `location-search` or `map-only` (default) | enum |