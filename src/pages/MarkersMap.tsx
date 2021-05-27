import MapContainer from "../components/MapContainer";

export type MarkerInfo = {
  coordinates: google.maps.LatLngLiteral;
  title: string;
  iconUrl?: any;
};

const mapWidth = "60vw";

const iconUrl =
  "http://cdn.shopify.com/s/files/1/1061/1924/products/Lemon_Emoji_grande.png?v=1571606034";

const MarkersMap = () => {
  const markers: MarkerInfo[] = [
    {
      coordinates: {
        lng: -122.32,
        lat: 47.608013,
      },
      title: "marker 1",
      iconUrl,
    },
    {
      coordinates: {
        lng: -122.33,
        lat: 47.606013,
      },
      title: "marker 2",
      iconUrl,
    },
  ];

  const markersListItems = markers.map((marker, idx) => (
    <li key={idx}>
      <strong>{marker.title}</strong> → {marker.coordinates.lat},{" "}
      {marker.coordinates.lng}
    </li>
  ));

  return (
    <>
      <h1>This is a map with markers using google-maps-react.</h1>
      <div style={styles.wrapper}>
        <div style={styles.mapWrapper}>
          <MapContainer width={mapWidth} markers={markers} />
        </div>
        <div style={styles.listWrapper}>
          <ul>{markersListItems}</ul>
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

export default MarkersMap;
