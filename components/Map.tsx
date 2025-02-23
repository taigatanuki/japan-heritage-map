import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Markerに表示するアイコンの定義
const customIcon = new L.Icon({
    iconUrl: "/marker-icon.png", // publicフォルダに画像を配置
    iconSize: [25, 41], // アイコンのサイズ
    iconAnchor: [12, 41], // アイコンのアンカー位置
    popupAnchor: [1, -34], // ポップアップのアンカー位置
    shadowUrl: "/marker-shadow.png", // 影の画像（不要なら削除）
    shadowSize: [41, 41],
});

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
        <MapContainer center={[35.6895, 139.6917]} zoom={5} className="w-full h-full">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {heritages.map((heritage) => (
                <Marker key={heritage.id} position={[heritage.lat, heritage.lng]} icon={customIcon}>
                    <Popup>
                        <strong>{heritage.name}</strong>
                        <br />
                        {heritage.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;