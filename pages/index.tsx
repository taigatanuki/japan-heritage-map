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
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                日本の世界自然遺産
            </h1>
            <div className="w-full max-w-4xl h-96 bg-white rounded-lg overflow-hidden border border-gray-300">
                <Map heritages={heritages} />
            </div>
            <div className="w-full max-w-4xl rounded-lg bg-white shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">遺産リスト</h2>
                <ul className="space-y-3">
                    {heritages.map((heritage) => (
                        <li key={heritage.id} className="p-4 bg-blue-100 rounded-lg shadow-sm border border-blue-200">
                            <p className="text-lg font-medium text-blue-800">{heritage.name}</p>
                            <p className="text-sm text-gray-600">{heritage.address}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}