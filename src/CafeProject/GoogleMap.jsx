import { useState, useEffect, useRef } from "react";

const GoogleMap = ({ lat, lon, title }) => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: lat, lng: lon },
      zoom: 13,
    });

    const newMarker = new window.google.maps.Marker({
      position: { lat: lat, lng: lon },
      map: newMap,
    });

    const contentString = `<div>
      <div style="display:flex; gap:3px;">
      <i class="xi-cafe"></i>
      <p>${title}</p>
      </div>
      </div>`;

    const newInfoWindow = new window.google.maps.InfoWindow({
      content: contentString, // InfoWindow에 표시할 내용
    });
    newInfoWindow.open(newMap, newMarker);
    return () => {
      newMarker.setMap(null); // Remove marker from the map
      newInfoWindow.close(); // Close the InfoWindow if it's open
    };
  }, [lat, lon, title]);

  return <div ref={ref} id="map"></div>;
};

export default GoogleMap;
