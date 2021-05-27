import MapContainer from "../components/MapContainer";

const BasicMap = () => {
  return (
    <div className="container">
      <h2>This is a basic map using google-maps-react.</h2>
      <div>
        <MapContainer />
      </div>
    </div>
  );
};

export default BasicMap;
