import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Markerに表示するアイコンの定義
const customIcon = new L.Icon({
    iconUrl: "/location.png", // publicフォルダに画像を配置
    iconSize: [40, 40], // アイコンのサイズ
    iconAnchor: [12, 41], // アイコンのアンカー位置
    popupAnchor: [1, -34], // ポップアップのアンカー位置
});

type Heritage = {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    imageUrl: string;
}

type MapProps = {
    heritages: Heritage[];
    selectedId: number | null;
    setSelectedId: (id:number | null) => void;
}

const Map = ({ heritages, selectedId, setSelectedId }: MapProps) => {
    return (
        <MapContainer center={[36.36744265225814, 137.89841440187962]} zoom={4} className="w-full h-full">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {heritages.map((heritage) => (
                <Marker
                    key={heritage.id}
                    position={[heritage.lat, heritage.lng]}
                    icon={customIcon}
                    eventHandlers={{
                        click: () => setSelectedId(heritage.id),// クリックされたマーカーのIDをselectedIDに設定
                    }}
                >
                    <Popup>
                        <img src={heritage.imageUrl} alt={heritage.name} className="w-32 h-20 object-cover rounded-md mb-2" />
                        <p className="text-lg font-bold">{heritage.name}</p>
                        <p className="text-sm text-gray-600">{heritage.address}</p>
                        <Link href={`/heritage/${heritage.id}`} className="text-blue-500 hover:underline">
                            詳細を見る
                        </Link>
                    </Popup>
                </Marker>
            ))}
            {/* {マーカーの移動} */}
            <MapMover heritages={heritages} selectedId={selectedId} />
        </MapContainer>
    );
};

const MapMover = ({ heritages, selectedId }: { heritages: Heritage[]; selectedId: number | null;}) => {
    const map = useMap();

    useEffect(() => {
        if(selectedId !== null) {
            const selectedHeritage = heritages.find((h) => h.id === selectedId);
            if(selectedHeritage) {
                map.setView([selectedHeritage.lat, selectedHeritage.lng], 7, {animate: true});
            }
        }
    }, [selectedId, heritages, map])

    return null;
};

export default Map;