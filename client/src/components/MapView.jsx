// C:\PoliceAI-Command-Center\client\src\components\MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ locations }) => {
  const center = [26.8467, 80.9462];

  const validLocations = (locations || []).filter(
    (item) =>
      typeof item.latitude === "number" &&
      typeof item.longitude === "number"
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h2 className="text-white font-bold mb-4">Live Crime Map</h2>

      <div className="rounded-xl overflow-hidden">
        <MapContainer center={center} zoom={13} className="h-[350px] w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {validLocations.map((item) => (
            <Marker key={item._id} position={[item.latitude, item.longitude]}>
              <Popup>
                <div>
                  <b>{item.crimeType}</b>
                  <br />
                  Severity: {item.severity}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;