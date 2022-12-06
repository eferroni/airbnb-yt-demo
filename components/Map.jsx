// import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
import Map, { Marker, Popup } from "react-map-gl";
import Pin from "./pin";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

function MapComponent({ searchResults }) {
  const [popupInfo, setPopupInfo] = useState(null);

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100%", height: "100%" }}
      mapboxAccessToken={process.env.mapbox_token}
      mapStyle="mapbox://styles/eferroni/clbcfqwqp001j15kuex7wi5g6"
    >
      {searchResults?.map((item) => (
        <Marker
          key={item.long}
          longitude={item.long}
          latitude={item.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(item);
          }}
        >
          <div className="bg-white px-2 py-1 rounded-2xl shadow-lg cursor-pointer active:bg-black ">
            <p className="text-gray-900 font-semibold text-lg active:text-white">
              {item.price.replace("/ night", "")}
            </p>
          </div>
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.long)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="bg-white flex items-center">
            <p className="text-xs text-gray-500 pr-2">{popupInfo.title}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default MapComponent;
