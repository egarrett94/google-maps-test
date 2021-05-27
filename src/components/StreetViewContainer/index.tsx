import { GoogleApiWrapper, IMapProps } from "google-maps-react";
import LoadingContainer from "../LoadingContainer";
import React from "react";

type StreetViewContainerProps = IMapProps & {
  height?: string;
  width?: string;
  zoom?: number;
  position?: { lat: number; lng: number };
};

const StreetViewContainer = ({
  height = "30vh",
  width = "40vw",
  zoom = 14,
  position,
}: StreetViewContainerProps) => {
  const streetviewContainerRef = React.useRef<HTMLDivElement>(null);

  const styles = {
    container: {
      maxWidth: width,
      height,
      padding: "20px",
    },
    map: {
      maxWidth: width,
      height,
      overflowX: "hidden" as any,
      overflowY: "hidden" as any,
      display: !!position ? "block" : "none",
    },
    placeholder: {
      maxWidth: width,
      height,
      backgroundColor: "tomato",
      display: !!position ? "none" : "flex",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  React.useEffect(() => {
    const opts = {
      // addressControl: false,
      // // addressControlOptions: null,
      clickToGo: false,
      // // controlSize: null,
      disableDefaultUI: true,
      // disableDoubleClickZoom: true,
      // fullScreenControl: false,
      // // fullScreenControlOptions: null,
      // imageDateControl: false,
      // linksControl: false,
      // motionTracking: true,
      // motionTrackingControl: true,
      // // motionTrackingControlOptions: null,
      // panControl: true,
      // // pano: customid,
      position,
      // // pov: StreetViewPov,
      scrollwheel: false,
      // showRoadLabels: false,
      visible: !!position,
      zoom,
      // zoomControl: true,
      // // zoomControlOptions: null,
    };

    new google.maps.StreetViewPanorama(
      streetviewContainerRef.current as Element,
      opts
    );
  }, [zoom, position]);

  console.log("position", position);

  return (
    <div style={styles.container}>
      <div style={styles.map} ref={streetviewContainerRef}></div>
      <div style={styles.placeholder}>
        Click a marker to see the Street View.
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || "",
  LoadingContainer,
})(StreetViewContainer);
