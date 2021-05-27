import { GoogleAPI, Marker, markerEventHandler } from "google-maps-react";
import { MarkerInfo } from "../../pages/MarkersMap";

const defaultUrl =
  "http://cdn.shopify.com/s/files/1/1061/1924/products/Lemon_Emoji_grande.png?v=1571606034";

const Markers = (props: {
  markers: MarkerInfo[];
  google: GoogleAPI;
  onMarkerClick: markerEventHandler;
}) => {
  const { markers, google, onMarkerClick } = props;

  if (!markers) return;

  return markers.map((marker, idx) => (
    <Marker
      key={`idx-${idx}`}
      onClick={onMarkerClick}
      position={{
        lat: marker.coordinates.lat,
        lng: marker.coordinates.lng,
      }}
      icon={{
        url: marker.iconUrl ? marker.iconUrl : defaultUrl,
        anchor: new google.maps.Point(32, 32),
        scaledSize: new google.maps.Size(32, 32),
      }}
      title={marker.title}
    >
      {marker.title}
    </Marker>
  ));
};

export default Markers;
