import { markerEventHandler } from "google-maps-react";
import React from "react";
import MapContainer from "../components/MapContainer";
import StreetViewContainer from "../components/StreetViewContainer";
import IWalkData from "../iwalk-data.json";

export type MarkerInfo = {
  coordinates: google.maps.LatLngLiteral;
  title: string;
  iconUrl?: string;
  slug: string;
};

const mapWidth = "40vw";

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row" as any,
  },
  mapWrapper: {
    width: mapWidth,
  },
  listWrapper: {
    maxWidth: "40vw",
  },
};

const markers: MarkerInfo[] = IWalkData.walk.stops.map((stop: any) => ({
  coordinates: { lat: stop.lat, lng: stop.lng },
  title: stop.name.en,
  slug: stop.slug,
}));

const IWalkMapAndStreetView = (props: any) => {
  const [activeMarker, setActiveMarker] = React.useState<any>(null);
  const initialCenter = markers[0].coordinates;

  const markersListItems = markers.map((marker, idx) => (
    <li
      key={idx}
      style={{
        padding: "0.5rem",
        color:
          activeMarker && activeMarker.title === marker.title
            ? "tomato"
            : "black",
      }}
    >
      <strong>{marker.title}</strong> → {marker.coordinates.lat},
      {marker.coordinates.lng}
    </li>
  ));

  const onMarkerClick: markerEventHandler = (_, clickedMarker, __) => {
    setActiveMarker(clickedMarker);
  };

  const onMapClick = (marker: any) => {
    if (activeMarker === null) return;
    setActiveMarker(null);
  };

  return (
    <div className="container">
      <h2>
        This is a map and street view with IWalk location markers using
        google-maps-react + the streetview API.
      </h2>
      <div style={styles.wrapper}>
        <div style={styles.mapWrapper}>
          <MapContainer
            initialCenter={initialCenter}
            width={mapWidth}
            markers={markers}
            onMarkerClick={onMarkerClick}
            onMapClick={onMapClick}
            activeMarker={activeMarker}
          />
        </div>
        <div style={styles.listWrapper}>
          <div>
            <ul>{markersListItems}</ul>
          </div>
          <StreetViewContainer
            position={
              activeMarker && {
                lat: activeMarker.position.lat(),
                lng: activeMarker.position.lng(),
              }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default IWalkMapAndStreetView;
