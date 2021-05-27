import React from "react";
import {
  Map,
  GoogleApiWrapper,
  IMapProps,
  InfoWindow,
  markerEventHandler,
} from "google-maps-react";
import LoadingContainer from "../LoadingContainer";
import getMarkers from "./Markers";
import { MarkerInfo } from "../../pages/MarkersMap";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY || "";

type MapContainerProps = IMapProps & {
  height?: string;
  width?: string;
  markers?: MarkerInfo[];
  initialCenter?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: markerEventHandler;
  onMapClick?: (marker: any) => void;
  activeMarker?: google.maps.Marker & { title: string };
};

const MapContainer = ({
  height = "100%",
  width = "100%",
  markers,
  google,
  initialCenter = {
    lat: 47.608013,
    lng: -122.335167,
  },
  zoom = 18,
  onMarkerClick = () => null,
  onMapClick,
  activeMarker,
}: MapContainerProps) => {
  const mapStyles = {
    container: {
      maxWidth: width,
      height,
    },
    map: {
      maxWidth: width,
      height,
      overflowX: "hidden",
      overflowY: "hidden",
    },
  };

  const [map, setMap] =
    React.useState<google.maps.Map | google.maps.StreetViewPanorama>();

  return (
    <Map
      google={google}
      initialCenter={initialCenter}
      onReady={(_, mapProp) => !map && setMap(mapProp)}
      containerStyle={mapStyles.container}
      onClick={onMapClick}
      style={mapStyles.map}
      zoom={zoom}
      streetViewControl
    >
      {markers && getMarkers({ markers, google, onMarkerClick })}

      {activeMarker && (
        <InfoWindow
          google={google}
          // this is unfortunate -- the types for google-maps-react falsely requires a map prop
          // to be sent to the InfoWindow even though it is nested within a Map -- it should be
          // handled like it is in a Marker component, but alas
          map={map as google.maps.Map}
          marker={activeMarker}
          visible={!!activeMarker}
        >
          <div>
            <p>{activeMarker && activeMarker.title}</p>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey,
  LoadingContainer,
})(MapContainer);
