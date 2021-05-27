import { markerEventHandler } from "google-maps-react";
import React from "react";
import MapContainer from "../components/MapContainer";
import StreetViewContainer from "../components/StreetViewContainer";
import IWalkData from "../iwalk-data.json";

export type MarkerInfo = {
  coordinates: google.maps.LatLngLiteral;
  title: string;
  iconUrl?: any;
  slug: string;
};

const mapWidth = "40vw";

const iconUrl =
  "http://cdn.shopify.com/s/files/1/1061/1924/products/Lemon_Emoji_grande.png?v=1571606034";

const IWalkMapAndStreetView = (props: any) => {
  const [activeMarker, setActiveMarker] = React.useState<any>(null);
  const markers: MarkerInfo[] = IWalkData.walk.stops.map((stop: any) => ({
    coordinates: { lat: stop.lat, lng: stop.lng },
    title: stop.name.en,
    iconUrl,
    slug: stop.slug,
  }));

  console.log(IWalkData);

  const initialCenter = markers[0].coordinates;

  const markersListItems = markers.map((marker, idx) => (
    <li
      key={idx}
      style={{
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
    console.log("opening info window for:", clickedMarker);

    setActiveMarker(clickedMarker);
  };

  const onMapClick = (marker: any) => {
    if (activeMarker === null) return;

    console.log("closing info window!");
    setActiveMarker(null);
  };

  return (
    <>
      <h1>
        This is a map and street view with IWalk location markers using
        google-maps-react + the streetview API.
      </h1>
      <div style={styles.wrapper}>
        <div style={styles.mapWrapper}>
          <MapContainer
            initialCenter={initialCenter}
            width={mapWidth}
            markers={markers}
            onMarkerClick={onMarkerClick}
            onMapClick={onMapClick}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
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
    </>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    "flex-direction": "row",
  },
  mapWrapper: {
    width: mapWidth,
  },
  listWrapper: {
    maxWidth: "40vw",
  },
};

export default IWalkMapAndStreetView;
