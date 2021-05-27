import MapContainer from "../components/MapContainer";

export type MarkerInfo = {
  coordinates: google.maps.LatLngLiteral;
  title: string;
  iconUrl?: string;
};

const mapWidth = "60vw";

const MarkersMap = () => {
  const markers: MarkerInfo[] = [
    {
      coordinates: {
        lng: -122.32,
        lat: 47.608013,
      },
      title: "marker 1",
    },
    {
      coordinates: {
        lng: -122.33,
        lat: 47.606013,
      },
      title: "marker 2",
    },
  ];

  const markersListItems = markers.map((marker, idx) => (
    <li key={idx} style={{ padding: "0.5rem" }}>
      <strong>{marker.title}</strong> → {marker.coordinates.lat},{" "}
      {marker.coordinates.lng}
    </li>
  ));

  return (
    <div className="container">
      <h2>This is a map with markers using google-maps-react.</h2>
      <div style={styles.wrapper}>
        <div style={styles.mapWrapper}>
          <MapContainer width={mapWidth} markers={markers} />
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

export default MarkersMap;
