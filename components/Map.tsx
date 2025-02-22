import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Heritage = {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
}

type MapProps = {
    heritages: Heritage[];
}
const Map = ({ heritages }: MapProps) => {
    return (
        <MapContainer center={[35.6895, 139.6917]} zoom={5} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {heritages.map((heritage) => (
                <Marker key={heritage.id} position={[heritage.lat, heritage.lng]}>
                    <Popup>
                        {heritage.name} <br /> {heritage.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;