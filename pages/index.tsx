import { useEffect, useState } from "react";
import { fetchHeritages } from "../utils/fetchHeritages";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

type Heritage = {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number
}

export default function Home() {
    const [heritages, setHeritages] = useState<Heritage[]>([]);
    console.log("最初のデータ：", heritages);

    useEffect(() => {
        const loadHeritages = async () => {
            const data = await fetchHeritages();
            console.log("取得したデータ：", data);
            setHeritages(data);
        };
        loadHeritages();
    }, []);

    return (
        <div>
            <h1>日本の世界自然遺産</h1>
            <ul>
                {heritages.map((heritage) => (
                    <li key={heritage.id}>
                        {heritage.name} ({heritage.address})　＊緯度経度：（{heritage.lat}, {heritage.lng}）
                    </li>
                ))}
            </ul>
            <div>
                <h1>日本の世界自然遺産マップ</h1>
                <Map heritages={heritages} />
            </div>
        </div>
    );
}