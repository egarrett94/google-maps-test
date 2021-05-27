import { GoogleAPI, Marker, markerEventHandler } from "google-maps-react";
import React from "react";
import { MarkerInfo } from "../../pages/MarkersMap";

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
        url: marker.iconUrl,
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
