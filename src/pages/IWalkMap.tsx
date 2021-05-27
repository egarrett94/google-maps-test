import MapContainer from "../components/MapContainer";
const IWalkData = require("../iwalk-data.json");

export type MarkerInfo = {
  coordinates: google.maps.LatLngLiteral;
  title: string;
  iconUrl?: any;
};

const mapWidth = "40vw";

const iconUrl =
  "http://cdn.shopify.com/s/files/1/1061/1924/products/Lemon_Emoji_grande.png?v=1571606034";

const IWalkMap = () => {
  const markers: MarkerInfo[] = IWalkData.walk.stops.map((stop: any) => {
    return {
      coordinates: { lat: stop.lat, lng: stop.lng },
      title: stop.name.en,
      iconUrl,
    };
  });

  const initialCenter = markers[0].coordinates;

  const markersListItems = markers.map((marker, idx) => (
    <li key={idx} style={{ padding: "0.5rem" }}>
      <strong>{marker.title}</strong> → {marker.coordinates.lat},{" "}
      {marker.coordinates.lng}
    </li>
  ));

  return (
    <div className="container">
      <h2>
        This is a map with IWalk location markers using google-maps-react.
      </h2>
      <div style={styles.wrapper}>
        <div style={styles.mapWrapper}>
          <MapContainer
            initialCenter={initialCenter}
            width={mapWidth}
            markers={markers}
          />
        </div>
        <div style={styles.listWrapper}>
          <ul>{markersListItems}</ul>
        </div>
      </div>
    </div>
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

export default IWalkMap;
